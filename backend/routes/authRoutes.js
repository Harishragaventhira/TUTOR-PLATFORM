const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const OtpVerification = require('../models/OtpVerification');
const User = require('../models/User');
const VerifiedEmail = require('../models/VerifiedEmail');
const { sendOtpEmail } = require('../services/emailService');

const router = express.Router();



// Resend limit map (in-memory tracker for requests per minute)
const resendLimits = new Map();

function checkResendRateLimit(email) {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;
  
  let timestamps = resendLimits.get(email) || [];
  timestamps = timestamps.filter(t => t > oneMinuteAgo);
  
  if (timestamps.length >= 3) {
    return false; // Limit exceeded
  }
  
  timestamps.push(now);
  resendLimits.set(email, timestamps);
  return true;
}

// 1. GET /api/auth/geocode (Preview for frontend)
router.get('/geocode', async (req, res) => {
  try {
    const addressObj = req.query;
    if (!addressObj || !addressObj.district) return res.status(400).json({ error: 'Address object required' });
    
    const { getCoordinates } = require('../services/geocodeService');
    const coords = await getCoordinates(addressObj);
    res.json(coords || { latitude: null, longitude: null, display_name: null });
  } catch (error) {
    res.status(500).json({ error: 'Failed to geocode' });
  }
});

// 2. POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed_otp = await bcrypt.hash(otp, 10);
    const expires_at = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await OtpVerification.destroy({ where: { email } });
    
    await OtpVerification.create({
      email,
      hashed_otp,
      expires_at,
      attempt_count: 0,
      resend_count: 0
    });

    const emailSent = await sendOtpEmail(email, otp);
    
    res.json({ 
      message: emailSent ? 'OTP sent successfully' : 'OTP generated (Email delivery failed)', 
      _dev_otp: (!emailSent && process.env.NODE_ENV !== 'production') ? otp : undefined 
    });

  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// 2. POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ status: 'invalid', message: 'Email and OTP required' });

    const record = await OtpVerification.findOne({ where: { email } });
    if (!record) {
      return res.status(400).json({ status: 'invalid', message: 'OTP not found or expired' });
    }

    if (new Date() > record.expires_at) {
      await OtpVerification.destroy({ where: { email } });
      return res.status(400).json({ status: 'expired', message: 'OTP has expired' });
    }

    if (record.attempt_count >= 3) {
      await OtpVerification.destroy({ where: { email } });
      return res.status(400).json({ status: 'invalid', message: 'Max attempts reached' });
    }

    const isMatch = await bcrypt.compare(otp, record.hashed_otp);
    if (!isMatch) {
      record.attempt_count += 1;
      await record.save();
      return res.status(400).json({ status: 'invalid', message: 'Invalid OTP' });
    }

    // Valid OTP
    await OtpVerification.destroy({ where: { email } });
    
    // Mark email as verified temporarily
    await VerifiedEmail.upsert({ email });

    res.json({ status: 'verified', message: 'OTP verified successfully' });

  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to verify OTP' });
  }
});

// 3. POST /api/auth/resend-otp
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    if (!checkResendRateLimit(email)) {
      return res.status(429).json({ error: 'Max 3 resend requests per minute allowed' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed_otp = await bcrypt.hash(otp, 10);
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);

    const record = await OtpVerification.findOne({ where: { email } });
    const currentResendCount = record ? record.resend_count : 0;

    await OtpVerification.upsert({
      email,
      hashed_otp,
      expires_at,
      attempt_count: 0,
      resend_count: currentResendCount + 1
    });

    const emailSent = await sendOtpEmail(email, otp);
    
    res.json({ 
      message: emailSent ? 'OTP resent successfully' : 'OTP regenerated (Email delivery failed)', 
      _dev_otp: (!emailSent && process.env.NODE_ENV !== 'production') ? otp : undefined 
    });

  } catch (error) {
    console.error('Resend OTP Error:', error);
    res.status(500).json({ error: 'Failed to resend OTP' });
  }
});

// 4. POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, mobile, profileType, current_address, permanent_address, is_same_address } = req.body;

    const verified = await VerifiedEmail.findOne({ where: { email } });
    if (!verified) {
      return res.status(403).json({ error: 'Email not verified or verification expired' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Validate current address
    if (!current_address || !current_address.door_no || !current_address.street_address || !current_address.area || !current_address.taluk || !current_address.district || !current_address.state || !current_address.pincode) {
      return res.status(400).json({ error: 'Current address is required and must be complete' });
    }
    
    const permanentAddressToSave = is_same_address ? current_address : permanent_address;
    if (!is_same_address && (!permanentAddressToSave || !permanentAddressToSave.door_no || !permanentAddressToSave.street_address || !permanentAddressToSave.area || !permanentAddressToSave.taluk || !permanentAddressToSave.district || !permanentAddressToSave.state || !permanentAddressToSave.pincode)) {
      return res.status(400).json({ error: 'Permanent address is required and must be complete if not same as current' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      mobile,
      profileType,
      email_verified: true,
      status: 'pending_admin'
    });

    await user.save();
    
    // Save current address
    const UserAddress = require('../models/UserAddress');
    const { getCoordinates } = require('../services/geocodeService');
    
    const coordinates = await getCoordinates(current_address);
    
    const currentAddressRecord = await UserAddress.create({
      user_id: user.id,
      address_type: 'current',
      door_no: current_address.door_no.trim(),
      street_address: current_address.street_address.trim(),
      area: current_address.area.trim(),
      landmark: current_address.landmark ? current_address.landmark.trim() : null,
      taluk: current_address.taluk.trim(),
      district: current_address.district.trim(),
      state: current_address.state.trim(),
      country: current_address.country ? current_address.country.trim() : 'India',
      pincode: current_address.pincode.trim(),
      latitude: coordinates ? coordinates.latitude : null,
      longitude: coordinates ? coordinates.longitude : null,
    });
    
    // Save permanent address
    await UserAddress.create({
      user_id: user.id,
      address_type: 'permanent',
      door_no: permanentAddressToSave.door_no.trim(),
      street_address: permanentAddressToSave.street_address.trim(),
      area: permanentAddressToSave.area.trim(),
      landmark: permanentAddressToSave.landmark ? permanentAddressToSave.landmark.trim() : null,
      taluk: permanentAddressToSave.taluk.trim(),
      district: permanentAddressToSave.district.trim(),
      state: permanentAddressToSave.state.trim(),
      country: permanentAddressToSave.country ? permanentAddressToSave.country.trim() : 'India',
      pincode: permanentAddressToSave.pincode.trim(),
    });
    
    await VerifiedEmail.destroy({ where: { email } }); 

    res.json({ success: true, message: 'User registered successfully, pending admin approval' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// FORGOT PASSWORD FLOW

// 5. POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Return success anyway to prevent email enumeration
      return res.json({ success: true, message: 'If the email is registered, an OTP was sent' });
    }

    if (!checkResendRateLimit(email)) {
      return res.status(429).json({ error: 'Max 3 requests per minute allowed' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashed_otp = await bcrypt.hash(otp, 10);
    const expires_at = new Date(Date.now() + 5 * 60 * 1000);

    await OtpVerification.destroy({ where: { email } });
    
    await OtpVerification.create({
      email,
      hashed_otp,
      expires_at,
      attempt_count: 0,
      resend_count: 0
    });

    sendOtpEmail(email, otp);

    res.json({ message: 'OTP sent for password reset' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ error: 'Failed to process forgot password request' });
  }
});

// 6. POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) return res.status(400).json({ error: 'Email, OTP, and new password are required' });

    const record = await OtpVerification.findOne({ where: { email } });
    if (!record) {
      return res.status(400).json({ status: 'invalid', message: 'OTP not found or expired' });
    }

    if (new Date() > record.expires_at) {
      await OtpVerification.destroy({ where: { email } });
      return res.status(400).json({ status: 'expired', message: 'OTP has expired' });
    }

    if (record.attempt_count >= 3) {
      await OtpVerification.destroy({ where: { email } });
      return res.status(400).json({ status: 'invalid', message: 'Max attempts reached' });
    }

    const isMatch = await bcrypt.compare(otp, record.hashed_otp);
    if (!isMatch) {
      record.attempt_count += 1;
      await record.save();
      return res.status(400).json({ status: 'invalid', message: 'Invalid OTP' });
    }

    // Valid OTP - Reset Password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hashedPassword }, { where: { email } });
    await OtpVerification.destroy({ where: { email } });

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// 7. POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

    // Admin backdoor for demo purposes
    if (username === 'admin' && password === 'admin') {
      return res.json({ success: true, role: 'admin', message: 'Admin login successful' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return the user status so frontend knows whether to allow access or show pending screen
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileType: user.profileType,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Failed to process login' });
  }
});

module.exports = router;

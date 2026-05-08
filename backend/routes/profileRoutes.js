const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const TutorProfile = require('../models/TutorProfile');

// POST /api/profile/student
router.post('/student', async (req, res) => {
  try {
    const { email, profileData } = req.body;
    
    // Find the user to link the profile
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if profile already exists
    let profile = await StudentProfile.findOne({ where: { user_id: user.id } });
    
    if (profile) {
      // Update existing
      await profile.update(profileData);
    } else {
      // Create new
      profile = await StudentProfile.create({
        user_id: user.id,
        ...profileData
      });
    }

    res.json({ success: true, message: 'Student profile saved successfully' });
  } catch (error) {
    console.error('Save Student Profile Error:', error);
    res.status(500).json({ error: 'Failed to save student profile' });
  }
});

// POST /api/profile/tutor
router.post('/tutor', async (req, res) => {
  try {
    const { email, profileData } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let profile = await TutorProfile.findOne({ where: { user_id: user.id } });
    
    if (profile) {
      await profile.update(profileData);
    } else {
      profile = await TutorProfile.create({
        user_id: user.id,
        ...profileData
      });
    }

    res.json({ success: true, message: 'Tutor profile saved successfully' });
  } catch (error) {
    console.error('Save Tutor Profile Error:', error);
    res.status(500).json({ error: 'Failed to save tutor profile' });
  }
});

// GET /api/profile/student/:userId
router.get('/student/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const UserAddress = require('../models/UserAddress');

    const user = await User.findByPk(userId, {
      include: [
        { model: StudentProfile, as: 'studentProfile' },
        { model: UserAddress, as: 'addresses' }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Fetch Student Profile Error:', error);
    res.status(500).json({ error: 'Failed to fetch student profile' });
  }
});

// GET /api/profile/tutor/:userId
router.get('/tutor/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const UserAddress = require('../models/UserAddress');

    const user = await User.findByPk(userId, {
      include: [
        { model: TutorProfile, as: 'tutorProfile' },
        { model: UserAddress, as: 'addresses' }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Fetch Tutor Profile Error:', error);
    res.status(500).json({ error: 'Failed to fetch tutor profile' });
  }
});

module.exports = router;

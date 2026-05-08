const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get overall stats
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await User.count({ where: { profileType: 'Learner' } });
    const totalTutors = await User.count({ where: { profileType: 'Tutor' } });
    const pendingVerifications = await User.count({ where: { status: 'pending_admin' } });
    
    // For now, mock the rest of the stats since we only have User model active
    res.json({
      totalStudents,
      totalTutors,
      pendingVerifications,
      totalCourses: 89,
      totalBookings: 342,
      activeRequests: 45,
      revenue: "₹4,50,000"
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Get all tutors
router.get('/tutors', async (req, res) => {
  try {
    const { district, taluk, state } = req.query;
    const addressFilter = { address_type: 'current' };
    if (district) addressFilter.district = district;
    if (taluk) addressFilter.taluk = taluk;
    if (state) addressFilter.state = state;

    const UserAddress = require('../models/UserAddress');
    const TutorProfile = require('../models/TutorProfile');
    
    const tutors = await User.findAll({ 
      where: { profileType: 'Tutor' },
      include: [
        {
          model: UserAddress,
          as: 'addresses',
          where: (district || taluk || state) ? addressFilter : undefined,
          required: !!(district || taluk || state)
        },
        {
          model: TutorProfile,
          as: 'tutorProfile'
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(tutors);
  } catch (error) {
    console.error('Fetch Tutors Error:', error);
    res.status(500).json({ error: 'Failed to fetch tutors' });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const UserAddress = require('../models/UserAddress');
    const StudentProfile = require('../models/StudentProfile');
    const students = await User.findAll({ 
      where: { profileType: 'Learner' },
      include: [
        {
          model: UserAddress,
          as: 'addresses'
        },
        {
          model: StudentProfile,
          as: 'studentProfile'
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(students);
  } catch (error) {
    console.error('Fetch Students Error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get specific user details
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const UserAddress = require('../models/UserAddress');
    const StudentProfile = require('../models/StudentProfile');
    const TutorProfile = require('../models/TutorProfile');

    const user = await User.findByPk(id, {
      include: [
        { model: UserAddress, as: 'addresses' },
        { model: StudentProfile, as: 'studentProfile' },
        { model: TutorProfile, as: 'tutorProfile' }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Fetch User Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Update user status (approve/reject)
router.patch('/users/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending_admin', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json({ success: true, message: `User status updated to ${status}`, user });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({ error: 'Failed to update user status' });
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Course = require('../models/Course');
const CourseVideo = require('../models/CourseVideo');
const User = require('../models/User');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { tutor_id, title, description, price, category, level, thumbnail_url } = req.body;
    
    const course = await Course.create({
      tutor_id,
      title,
      description,
      price,
      category,
      level,
      thumbnail_url,
      status: 'published'
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Create Course Error:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Upload Video File for a Lesson
router.post('/:courseId/upload-video', upload.single('video'), async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, duration, order_index, is_preview } = req.body;
    
    console.log(`Receiving upload for Course ${courseId}: ${title}`);

    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ error: 'No video file uploaded or file type not allowed' });
    }

    const video_url = `/uploads/${req.file.filename}`;

    const video = await CourseVideo.create({
      course_id: courseId,
      title,
      video_url,
      duration,
      order_index: parseInt(order_index) || 0,
      is_preview: is_preview === 'true'
    });

    console.log('Video saved to DB:', video.id);
    res.status(201).json(video);
  } catch (error) {
    console.error('Video Upload Error Detail:', error);
    res.status(500).json({ error: 'Failed to process video upload: ' + error.message });
  }
});

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { status: 'published' },
      include: [{ model: User, as: 'tutor', attributes: ['username'] }]
    });
    res.json(courses);
  } catch (error) {
    console.error('Fetch Courses Error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get courses by tutor
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { tutor_id: req.params.tutorId },
      include: [{ model: CourseVideo, as: 'videos' }]
    });
    res.json(courses);
  } catch (error) {
    console.error('Fetch Tutor Courses Error:', error);
    res.status(500).json({ error: 'Failed to fetch tutor courses' });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const { title, description, price, category, level, status, thumbnail_url } = req.body;
    const course = await Course.findByPk(req.params.id);
    
    if (!course) return res.status(404).json({ error: 'Course not found' });

    await course.update({
      title,
      description,
      price,
      category,
      level,
      status,
      thumbnail_url
    });

    res.json(course);
  } catch (error) {
    console.error('Update Course Error:', error);
    res.status(500).json({ error: 'Failed to update course: ' + error.message });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Optionally delete associated videos first if not using CASCADE
    await CourseVideo.destroy({ where: { course_id: req.params.id } });
    await course.destroy();

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete Course Error:', error);
    res.status(500).json({ error: 'Failed to delete course: ' + error.message });
  }
});

// Get single course with videos
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [
        { model: User, as: 'tutor', attributes: ['username'] },
        { model: CourseVideo, as: 'videos' }
      ],
      order: [[{ model: CourseVideo, as: 'videos' }, 'order_index', 'ASC']]
    });

    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    console.error('Fetch Course Detail Error:', error);
    res.status(500).json({ error: 'Failed to fetch course details' });
  }
});

module.exports = router;

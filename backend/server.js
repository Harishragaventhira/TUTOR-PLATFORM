const express = require('express');

const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

const sequelize = require('./config/database');
require('./models/UserAddress');
require('./models/StudentProfile');
require('./models/TutorProfile');
require('./models/Course');
require('./models/CourseVideo');

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL Database via Sequelize');
    
    // Sync models
    // In production, you'd use migrations instead of sync()
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

connectDB();

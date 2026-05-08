const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./Course');

const CourseVideo = sequelize.define('CourseVideo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_preview: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'course_videos',
  underscored: true
});

// Relationships
Course.hasMany(CourseVideo, { foreignKey: 'course_id', as: 'videos' });
CourseVideo.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });

module.exports = CourseVideo;

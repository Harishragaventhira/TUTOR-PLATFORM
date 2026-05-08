const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tutor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    defaultValue: 'Beginner'
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  }
}, {
  timestamps: true,
  tableName: 'courses',
  underscored: true
});

// Relationships
User.hasMany(Course, { foreignKey: 'tutor_id', as: 'managedCourses' });
Course.belongsTo(User, { foreignKey: 'tutor_id', as: 'tutor' });

module.exports = Course;

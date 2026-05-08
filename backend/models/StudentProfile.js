const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const StudentProfile = sequelize.define('StudentProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  native_place: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  school_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  school_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  standard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  college_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  college_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  exam_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coaching_center: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reading_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  writing_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  speaking_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  listening_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  observation_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  recall_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  avg_score: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
  classification: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'student_profiles'
});

// Relationships
User.hasOne(StudentProfile, { foreignKey: 'user_id', as: 'studentProfile' });
StudentProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = StudentProfile;

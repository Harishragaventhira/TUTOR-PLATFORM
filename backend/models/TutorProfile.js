const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const TutorProfile = sequelize.define('TutorProfile', {
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
  native_place: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  education_details: {
    type: DataTypes.JSON, // To store UG, PG, BEd, MEd, MPhil, PhD arrays/objects
    allowNull: true,
  },
  experience_details: {
    type: DataTypes.JSON, // To store array of experience objects
    allowNull: true,
  },
  tutoring_modes: {
    type: DataTypes.JSON, // To store { online, home, studentHome, tuitionCenter }
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'tutor_profiles'
});

// Relationships
User.hasOne(TutorProfile, { foreignKey: 'user_id', as: 'tutorProfile' });
TutorProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = TutorProfile;

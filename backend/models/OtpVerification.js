const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OtpVerification = sequelize.define('OtpVerification', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hashed_otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  attempt_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  resend_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'otp_verifications'
});

module.exports = OtpVerification;

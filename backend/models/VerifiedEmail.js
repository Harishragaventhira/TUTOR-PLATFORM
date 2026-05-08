const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerifiedEmail = sequelize.define('VerifiedEmail', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'verified_emails'
});

module.exports = VerifiedEmail;

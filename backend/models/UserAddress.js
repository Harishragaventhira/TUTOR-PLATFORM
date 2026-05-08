const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserAddress = sequelize.define('UserAddress', {
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
  address_type: {
    type: DataTypes.ENUM('current', 'permanent'),
    allowNull: false,
  },
  door_no: DataTypes.STRING,
  street_address: DataTypes.STRING,
  area: DataTypes.STRING,
  landmark: DataTypes.STRING,
  taluk: DataTypes.STRING,
  district: DataTypes.STRING,
  state: DataTypes.STRING,
  country: {
    type: DataTypes.STRING,
    defaultValue: 'India'
  },
  pincode: DataTypes.STRING,
  latitude: DataTypes.FLOAT,
  longitude: DataTypes.FLOAT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: false,
  tableName: 'user_addresses'
});

// Relationships
User.hasMany(UserAddress, { foreignKey: 'user_id', as: 'addresses' });
UserAddress.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserAddress;

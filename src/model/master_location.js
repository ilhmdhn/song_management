const { DataTypes } = require('sequelize');
const sequelize = require('../sqlz'); // Sesuaikan dengan path dan nama file koneksi Sequelize Anda

const MasterLocation = sequelize.define('master_location', {
  id_location: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true, // Sesuaikan dengan kebutuhan Anda
  },
}, {
  tableName: 'master_location',
  timestamps: false,
});

module.exports = MasterLocation;

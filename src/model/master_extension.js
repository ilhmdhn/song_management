const { DataTypes } = require('sequelize');
const sequelize = require('../sqlz'); // Sesuaikan dengan path dan nama file koneksi Sequelize Anda

const MasterLocation = sequelize.define('master_extension', {
  extension: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
  }
}, {
  tableName: 'master_extension',
  timestamps: false,
});

module.exports = MasterLocation;

const { DataTypes } = require('sequelize');
const sqlz = require('../sqlz'); // Sesuaikan dengan path dan nama file koneksi Sequelize Anda

const MasterFile = sqlz.define('master_file', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_file: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  extention: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  date_modified: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  size: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'master_file',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom created_at dan updated_at
});

module.exports = MasterFile;

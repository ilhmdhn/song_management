const { DataTypes } = require('sequelize');
const sequelize = require('../sqlz'); // Sesuaikan dengan path dan nama file koneksi Sequelize Anda

const MasterSong = sequelize.define('master_song', {
  id: {
    type: DataTypes.STRING(25),
    allowNull: false,
    primaryKey: true,
  },
  song: {
    type: DataTypes.STRING(255),
    allowNull: true, // Sesuaikan dengan kebutuhan Anda
  },
  py_str: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  len: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  lan: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  sing_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  sing2_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  video_type: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  volume: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  brightness: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  contrast: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  saturation: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  grade: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  vcd_audio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dvd_audio: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  dvd_music: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  vod_type: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  pro: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  song_date: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  csong: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  label: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  original: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  composer1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  composer2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  genre1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  genre2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ffmpeg: {
    type: DataTypes.DECIMAL(10, 0),
    allowNull: true,
  },
  format: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'master_song',
  timestamps: false,
});

module.exports = MasterSong;
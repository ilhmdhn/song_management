const { DataTypes } = require('sequelize');
const sqlz = require('../sqlz');

const Configuration = sqlz.define('configuration', {
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'configuration',
    timestamps: false
});

module.exports = Configuration;
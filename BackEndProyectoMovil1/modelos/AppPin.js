const { DataTypes } = require('sequelize');
const sequelize = require('../bd/database');

const AppPin = sequelize.define('apppin', {
    id: { type: 
        DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    nro_de_celular: { type: 
        DataTypes.STRING(10), 
        allowNull: false },
    pin: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    nro_identidad: { 
        type: DataTypes.STRING(20), 
        allowNull: false },
    oficina_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    cod_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    nombre_de_cliente: { type: 
        DataTypes.STRING(80), 
        allowNull: false }
}, {
    tableName: 'app_pin',
    timestamps: false,
    freezeTableName: true
});

module.exports = AppPin;

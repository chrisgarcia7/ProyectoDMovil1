const { DataTypes } = require('sequelize');
const sequelize = require('../bd/database');

const MovtoAhorros = sequelize.define('movtoahorros', {
    id: { type: 
        DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    oficina_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    cod_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    nro_producto_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    tipo_movimiento: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    numero_de_referencia: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    fecha_movimiento: { type: 
        DataTypes.DATE, 
        allowNull: false },
    saldo_anterior: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    valor_mvto: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_posterior: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    estatus_mvto: { type: 
        DataTypes.STRING(12), 
        allowNull: false }
}, {
    tableName: 'app_movto_ahorros',
    timestamps: false,
    freezeTableName: true
});

module.exports = MovtoAhorros;

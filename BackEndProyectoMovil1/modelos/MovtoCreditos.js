const { DataTypes } = require('sequelize');
const sequelize = require('../bd/database');

const MovtoCreditos = sequelize.define('movtocreditos', {
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
    codigo_de_credito: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    tipo_movimiento: { type: 
        DataTypes.STRING(15), 
        allowNull: false },
    numero_de_referencia: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    fecha_movimiento: { type:
         DataTypes.DATE, 
         allowNull: false },
    valor_mvto: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    aplicado_capital: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    aplicado_intereses: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    aplicado_mora: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    aplicado_seguros: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    aplicado_otros: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    aplicado_cuenta_x_pagar: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_posterior_capital: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    estatus_mvto: { type: 
        DataTypes.STRING(10), 
        allowNull: false }
}, {
    tableName: 'app_movto_creditos',
    timestamps: false,
    freezeTableName: true
});

module.exports = MovtoCreditos;

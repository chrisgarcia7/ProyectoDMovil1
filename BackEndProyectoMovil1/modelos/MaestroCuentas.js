const { DataTypes } = require('sequelize');
const sequelize = require('../bd/database');

const MaestroCuentas = sequelize.define('maestrocuentas', {
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
    modulo_producto_cliente: { type: 
        DataTypes.STRING(20), 
        allowNull: false },
    nro_producto_cliente: { type: 
        DataTypes.INTEGER, 
        allowNull: false },
    descripcion_producto: { type: 
        DataTypes.STRING(255), 
        allowNull: false },
    tasa_producto: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_total: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    fecha_ultimo_movimiento: { type: 
        DataTypes.DATE, 
        allowNull: false },
    fecha_otorgado: { type: 
        DataTypes.DATE, 
        allowNull: false },
    fecha_vencimiento: { type: 
        DataTypes.DATE, 
        allowNull: false },
    monto_otorgado: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_capital: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_intereses: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    saldo_mora: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    saldo_seguros: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    saldo_otros: { type: 
        DataTypes.FLOAT, 
        allowNull: true },
    valor_cuota: { type: 
        DataTypes.FLOAT, 
        allowNull: false },
    estatus_producto: { type: 
        DataTypes.STRING(15), 
        allowNull: false }
}, {
    tableName: 'app_maestro_cuentas',
    timestamps: false,
    freezeTableName: true
});

module.exports = MaestroCuentas;

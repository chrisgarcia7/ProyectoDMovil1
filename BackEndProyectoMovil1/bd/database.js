const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proyectomovil1', 'root', 'sscu2017', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;

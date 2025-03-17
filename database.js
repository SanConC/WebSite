const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_bd', 'root', 'contraseña_correcta', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

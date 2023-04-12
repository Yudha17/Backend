const {Sequelize} = require('sequelize');

const db = new Sequelize('danstest2', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;
const {Sequelize} = require('sequelize');
const db = require( "./setup.js")

const {DataTypes} = Sequelize;

const users = db.define('users',{
    full_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    confirm_password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token:{
        type: DataTypes.TEXT
    },

},{
    freezeTableName:true
});

module.exports = users;
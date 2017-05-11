const Sequelize = require('sequelize');

const connection = require('../database');

const User = connection.define('users',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    gender:{
        type:Sequelize.STRING(6),
        allowNull:false
    },
    birthday:{
        type:Sequelize.DATE,
        allowNull:false
    }
});

module.exports = User;
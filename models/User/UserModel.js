const Sequelize = require('sequelize');
const connection = require('../../database/database')

const Users =  connection.define('Users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Users;
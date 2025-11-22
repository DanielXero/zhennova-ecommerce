const { Sequelize } = require('sequelize');
require('dotenv').config({quiet: true})



const sequelize = new Sequelize('zhennova_db', 'postgres', process.env.PASSWORD_DB, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


module.exports = sequelize
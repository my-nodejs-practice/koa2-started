const Sequelize = require('sequelize');
const { dbName, user, password, host } = require('../config/index').db;

const sequelize = new Sequelize(dbName, user, password, {
  host,
  dialect: 'mysql'
});

module.exports = { sequelize };

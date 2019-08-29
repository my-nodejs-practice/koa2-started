const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');

class Favor extends Model {}
Favor.init(
  {
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
    uid: Sequelize.INTEGER
  },
  {
    sequelize: sql,
    tableName: 'favor'
  }
);

module.exports = { Favor };

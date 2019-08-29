const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');

class Favor extends Model {
  static async like(art_id, type, uid) {
    
  }
}
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

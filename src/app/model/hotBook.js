const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');

class HotBook extends Model {}
HotBook.init(
  {
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
  },
  {
    sequelize: sql,
    tableName: 'hot_book'
  }
);

module.exports = { HotBook };

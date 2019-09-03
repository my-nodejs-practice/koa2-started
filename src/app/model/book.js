const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');

class Book extends Model {}
Book.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    fav_nums: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  { sequelize: sql, tableName: 'book' }
);

// Book.sync({ force: true });

module.exports = Book;

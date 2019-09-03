const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');
const util = require('util');
const axios = require('axios');

class Book extends Model {
  constructor() {
    super();
  }
  async getDetailById(id) {
    const url = util.format(global.config.yushu.detailUrl, id);
    return await axios.get(url);
  }
}
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

const { sql } = require('@src/core/db');
const { Sequelize, Model, Op } = require('sequelize');
const Favor = require('@models/favor');

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index']
    });
    const ids = books.reduce((prev, cur) => {
      prev.push(cur.id);
      return prev;
    }, []);
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
          type: 400
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    });
    let count = 0;
    books.forEach(book => {
      favors.forEach(favor => {
        if (book.id === favor.art_id) {
          count = favor.get('count');
        }
      });
      book.setDataValue('fav_nums', count);
    });
    return books;
  }
}
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

module.exports = HotBook;

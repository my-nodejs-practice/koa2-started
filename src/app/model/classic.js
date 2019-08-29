const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');
// 公共字段
const classicFields = {
  image: {
    type: Sequelize.STRING
  },
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
};

// 电影
class Movie extends Model {}
Movie.init(classicFields, { sequelize: sql, tableName: 'movie' });

// 语句
class Sentence extends Model {}
Sentence.init(classicFields, { sequelize: sql, tableName: 'sentence' });

// 音乐
class Music extends Model {}
Music.init(
  Object.assign({}, classicFields, {
    url: Sequelize.STRING
  }),
  { sequelize: sql, tableName: 'music' }
);

module.exports = { Movie, Sentence, Music };

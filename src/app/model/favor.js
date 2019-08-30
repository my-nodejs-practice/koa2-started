const { sql } = require('@src/core/db');
const { Sequelize, Model } = require('sequelize');
const { LikeError, DisLikeError } = require('@src/core/http_exception');
const { Art } = require('./art');

class Favor extends Model {
  /**
   * 点赞
   * @param {number} art_id id
   * @param {number} type 类别id
   * @param {number} uid 用户id
   */
  static async like(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { art_id, type, uid } });
    if (favor) {
      throw new LikeError();
    }
    return sql.transaction(async t => {
      await Favor.create({ art_id, type, uid }, { transaction: t });
      const art = await Art.getData(art_id, type);
      await art.increment('fav_nums', { by: 1, transaction: t });
    });
  }

  /**
   * 取消点赞
   * @param {number} art_id id
   * @param {number} type 类别id
   * @param {number} uid 用户id
   */
  static async disLike(art_id, type, uid) {
    const favor = await Favor.findOne({ where: { art_id, type, uid } });
    if (!favor) {
      throw new DisLikeError();
    }
    return sql.transaction(async t => {
      await favor.destroy({ force: true, transaction: t });
      const art = await Art.getData(art_id, type);
      await art.decrement('fav_nums', { by: 1, transaction: t });
    });
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

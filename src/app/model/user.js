const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sql } = require('@src/core/db');
class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, bcrypt.genSaltSync(10)));
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize: sql,
    modelName: 'user'
  }
);

module.exports = User;

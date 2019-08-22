const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sql } = require('@src/core/db');
const { AuthFailed } = require('@src/core/http_exception');

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new AuthFailed('账号不存在');
    }
    const correct = bcrypt.compareSync(plainPassword, user.password);
    if (!correct) {
      throw new AuthFailed('密码不正确');
    }
    return user;
  }
}

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

const Sequelize = require('sequelize');
const { dbName, user, password, host, port } = require('../config/index').db;

const sql = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: true, // default: console.log
  timezone: 'Asia/Shanghai', // '+08:00'
  define: {
    timestamps: true, // 将createdAt和updatedAt时间戳添加到模型中。
    paranoid: true, // 调用destroy不会删除模型，而是设置一个deletedAt时间戳，配合timestamps:true生效
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true, // 防止数据库表自动使用复数
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at']
        }
      }
    }
  }
});

sql.sync({ force: false });

module.exports = { sql };

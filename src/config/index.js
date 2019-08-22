module.exports = {
  env: 'dev',
  db: {
    dbName: 'study',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qq@532814151'
  },
  security: {
    secretKey: 'lizhigao', // jwt令牌秘钥
    expiresIn: 60 * 60 * 24 // 令牌过期时间（默认一个小时）
  }
};

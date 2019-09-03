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
  },
  wx: {
    appid: 'wx6da11785b3871015',
    appsecret: '224bfbd32ff3bf98d6cc50a68ebad024',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  }
};

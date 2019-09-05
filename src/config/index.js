module.exports = {
  env: 'dev',
  host: 'http://imooc.lizimu.top', // api host
  port: 3000, // api 端口
  db: {
    dbName: 'study',
    host: '94.191.117.102', // 'localhost', // 数据库域名地址
    port: 3306, // 数据库端口
    user: 'root',
    password: 'lzg_!qaz@wsx'
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

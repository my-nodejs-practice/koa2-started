const util = require('util');
const axios = require('axios');
const { generateToken } = require('@src/core/util');
const {
  wx: { loginUrl, appid, appsecret }
} = require('@src/config/index');
const User = require('../model/user');
const Auth = require('@src/middlewares/authority');
const { AuthFailed } = require('../../core/http_exception');

class WxManager {
  static async code2Token(code) {
    const url = util.format(loginUrl, appid, appsecret, code);
    const result = await axios.get(url);
    const { errcode, openid } = result.data;
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败');
    }
    if (errcode) {
      const msg =
        errcode === 40029 ? 'code 无效' : errcode === 45011 ? '频率限制，每个用户每分钟100次' : '系统繁忙，请稍候再试';
      throw new AuthFailed(`授权失败：${msg}`);
    }
    // 请求成功，将用户保存到数据库，再生成token返回。
    const user = await User.findOrCreateByOpenid(openid);
    return generateToken(user.id, Auth.USER);
  }
}

module.exports = WxManager;

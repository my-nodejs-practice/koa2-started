const util = require('util');
const axios = require('axios');
const { generateToken } = require('@src/core/util');
const {
  wx: { loginUrl, appid, appsecret }
} = require('@src/config/index');
class WxManager {
  static async code2Token(code) {
    const url = util.format(loginUrl, appid, appsecret, code);
    const result = await axios.get(url);
    // console.log('result>>', result);

    // return generateToken(user.id, Auth.USER);
  }
}

module.exports = WxManager;

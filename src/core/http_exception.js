/**
 * HttpException封装
 */
class HttpException extends Error {
  constructor(msg = '服务器异常', errcode = 10000, status = 400) {
    super();
    this.msg = msg;
    this.errcode = errcode;
    this.status = status;
  }
}

/**
 * 参数异常封装
 */
class ParameterException extends HttpException {
  constructor(msg = '参数错误', errcode = 10000) {
    super();
    this.status = 400;
    this.msg = msg;
    this.errcode = errcode;
  }
}

module.exports = { HttpException, ParameterException };

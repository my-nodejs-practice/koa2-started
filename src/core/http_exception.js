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

class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0) {
    super();
    this.msg = msg;
    this.status = 201;
    this.errcode = errorCode;
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

/**
 * 参数异常封装
 */
class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errcode = 10004) {
    super();
    this.status = 401;
    this.msg = msg;
    this.errcode = errcode;
  }
}

module.exports = { HttpException, Success, ParameterException, AuthFailed };

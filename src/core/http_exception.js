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

class Forbbiden extends HttpException {
  constructor(msg = '禁止访问', errcode = 10006) {
    super();
    this.status = 403;
    this.msg = msg;
    this.errcode = errcode;
  }
}

class LikeError extends HttpException {
  constructor(msg = '您已经点过赞', errcode = 60001) {
    super();
    this.status = 400;
    this.msg = msg;
    this.errcode = errcode;
  }
}

class DisLikeError extends HttpException {
  constructor(msg = '您已经取消点赞', errcode = 60002) {
    super();
    this.status = 400;
    this.msg = msg;
    this.errcode = errcode;
  }
}

module.exports = { HttpException, Success, ParameterException, AuthFailed, Forbbiden, LikeError, DisLikeError };

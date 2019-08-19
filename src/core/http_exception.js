class HttpException extends Error {
  constructor(msg = '服务器异常', errcode = 10000, status = 400) {
    super();
    this.msg = msg;
    this.errcode = errcode;
    this.status = status;
  }
}

module.exports = { HttpException };

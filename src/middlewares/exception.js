const { HttpException } = require('../core/http_exception');
const { env } = require('../config/index');
/**
 * catch全局错误并进行统一处理返回给浏览器客户端。
 * @param {object} ctx koa context
 * @param {function} next callback function
 */
const catcherror = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const isHttpException = error instanceof HttpException;
    // 开发环境 throw error
    if (env === 'dev' && !isHttpException) {
      throw error;
      // console.log(error.msg ? `${error.msg}: ` : '');
      // console.log(error.stack);
    }
    if (isHttpException) {
      const { msg, errcode, status } = error;
      ctx.body = {
        msg,
        errcode,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = status;
    } else {
      ctx.body = {
        msg: '系统异常，请稍后再试！',
        errcode: 99999,
        request: `${ctx.method} ${ctx.path}`
      };
      ctx.status = 500;
    }
  }
};

module.exports = catcherror;

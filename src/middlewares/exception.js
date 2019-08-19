const { HttpException } = require('@src/core/http_exception');
const catcherror = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpException) {
      const { msg, errcode, status } = error;
      ctx.body = {
        msg,
        errcode,
        status,
        request: `${ctx.method} ${ctx.path}`
      };
    }
  }
};

module.exports = catcherror;

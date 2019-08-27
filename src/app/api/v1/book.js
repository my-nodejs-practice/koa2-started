const Router = require('@koa/router');
const router = new Router();
// const { ParameterException } = require('@src/core/http_exception');
const Auth = require('@src/middlewares/authority');

router.get('/book/list', new Auth(2).authority, async ctx => {
  // ctx.auth.scope < 
  ctx.body = {
    code: 100,
    data: {
      uid: ctx.auth.uid,
      name: 'books'
    }
  };

  // throw new global.exception.HttpException('出错了！', 99999, 500);
});

module.exports = router;

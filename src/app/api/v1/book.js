const Router = require('@koa/router');
const router = new Router();
// const { ParameterException } = require('@src/core/http_exception');
const Auth = require('@src/middlewares/authority');

router.get('/book/hot_list', new Auth(6).authority, async ctx => {
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

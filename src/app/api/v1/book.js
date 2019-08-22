const Router = require('@koa/router');
const router = new Router();
// const { ParameterException } = require('@src/core/http_exception');
const auth = require('@src/middlewares/authority');

router.get('/book/list', auth, async ctx => {
  ctx.body = {
    code: 100,
    data: {
      name: 'books'
    }
  };

  // throw new global.exception.HttpException('出错了！', 99999, 500);
});

module.exports = router;

const Router = require('@koa/router');
// const { ParameterException } = require('@src/core/http_exception');
const Auth = require('@src/middlewares/authority');
const HotBook = require('@models/hotBook');

const router = new Router({
  prefix: '/v1/book'
});

router.get('/hot_list', new Auth().authority, async ctx => {
  const books = await HotBook.getAll();
  ctx.body = {
    code: 100,
    data: {
      ...books
    }
  };

  // throw new global.exception.HttpException('出错了！', 99999, 500);
});

module.exports = router;

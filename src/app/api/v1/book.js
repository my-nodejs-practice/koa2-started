const Router = require('@koa/router');
const router = new Router();
// const { ParameterException } = require('@src/core/http_exception');

router.get('/book/list', async ctx => {
  // console.log(ctx.cookies.get('io'));
  // ctx.cookies.set('test', 'lzg');
  // ctx.body = {
  //   code: 100,
  //   data: {
  //     name: 'books'
  //   }
  // };

  throw new global.exception.HttpException('出错了！', 99999, 500);
});

module.exports = router;

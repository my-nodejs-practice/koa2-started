const Router = require('@koa/router');
const router = new Router();
const { HttpException } = require('@src/core/http_exception');

router.get('/book/list', async ctx => {
  // console.log(ctx.cookies.get('io'));
  // ctx.cookies.set('test', 'lzg');
  // ctx.body = {
  //   code: 100,
  //   data: {
  //     name: 'books'
  //   }
  // };

  throw new HttpException('为啥呢？？', 10000, 200);
});

module.exports = router;

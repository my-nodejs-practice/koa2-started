const Router = require('@koa/router');
const router = new Router();

router.get('/book/list', async ctx => {
  // console.log(ctx.cookies.get('io'));
  // ctx.cookies.set('test', 'lzg');
  ctx.body = {
    code: 100,
    data: {
      name: 'books'
    }
  };
});

module.exports = router;

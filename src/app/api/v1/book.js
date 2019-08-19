const Router = require('@koa/router');
const router = new Router();

router.get('/book/list', async ctx => {
  ctx.body = 'Hello Books!';
});

module.exports = router;

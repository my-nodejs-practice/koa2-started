const Router = require('@koa/router');
const router = new Router();

router.get('/classic/list', async ctx => {
  ctx.body = 'Hello Classic!';
});

module.exports = router;

const Router = require('@koa/router');
const router = new Router();

router.get('/classic/list', async ctx => {
  ctx.body = {
    code: 100,
    data: {
      name: 'classic'
    }
  };
});

module.exports = router;

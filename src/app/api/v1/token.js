const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/token'
});

router.post('/', async ctx => {
  console.log(ctx);
});

module.exports = router;

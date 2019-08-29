const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/classic'
});
const Auth = require('@src/middlewares/authority');
const { Flow } = require('../../model/flow');

router.get('/list', async ctx => {
  ctx.body = {
    code: 100,
    data: {
      name: 'classic'
    }
  };
});

router.get('/latest', new Auth().authority, async ctx => {
  const result = await Flow.findOne({
    order: [['index', 'DESC']]
  });
  ctx.body = {
    result
  };
});

module.exports = router;

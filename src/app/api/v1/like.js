const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/like'
});
const { LikeValidator } = require('../../validators/validator');

router.post('/', async ctx => {
  const v = await new LikeValidator().validate(ctx);
  
});

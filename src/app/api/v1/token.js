const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/token'
});
const { TokenValidator } = require('../../validators/validator');
const { Success } = require('@src/core/http_exception');

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx);
  console.log(v);
  throw new Success('校验成功');
});

module.exports = router;

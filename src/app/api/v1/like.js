const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/like'
});
const { LikeValidator } = require('../../validators/validator');
const { Favor } = require('../../model/favor');
const { Success } = require('@src/core/http_exception');
const Auth = require('@src/middlewares/authority');

router.post('/', new Auth().authority, async ctx => {
  const v = await new LikeValidator().validate(ctx);
  await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  throw new Success();
});

router.post('/cancel', new Auth().authority, async ctx => {
  const v = await new LikeValidator().validate(ctx);
  await Favor.disLike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
  throw new Success();
});

module.exports = router;

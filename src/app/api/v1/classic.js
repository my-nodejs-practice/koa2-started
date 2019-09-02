const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/classic'
});
const Auth = require('@src/middlewares/authority');
const { Flow } = require('@models/flow');
const { Art } = require('@models/art');
const { Favor } = require('@models/favor');

router.get('/list', async ctx => {
  ctx.body = {
    code: 100,
    data: {
      name: 'classic'
    }
  };
});

router.get('/latest', new Auth().authority, async ctx => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']]
  });
  const art = await Art.getData(flow.art_id, flow.type);
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likeLatest);
  // eslint-disable-next-line
  ctx.body = {
    art
  };
});

module.exports = router;

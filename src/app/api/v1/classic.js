const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/classic'
});
const Auth = require('@src/middlewares/authority');
const { Flow } = require('@models/flow');
const { Art } = require('@models/art');
const { Favor } = require('@models/favor');
const { ClassicValidator, ClassicValidator2 } = require('../../validators/validator');
const { NotFound } = require('@src/core/http_exception');

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
  ctx.body = {
    art
  };
});

router.get('/:index/next', new Auth().authority, async ctx => {
  const v = await new ClassicValidator().validate(ctx);
  const i = v.get('path.index');
  const art = await getArtByIndex(i + 1, ctx);
  ctx.body = {
    art
  };
});

router.get('/:index/previous', new Auth().authority, async ctx => {
  const v = await new ClassicValidator().validate(ctx);
  const i = v.get('path.index');
  const art = await getArtByIndex(i - 1, ctx);
  ctx.body = {
    art
  };
});

router.get('/:type/:id', new Auth().authority, async ctx => {
  const v = await new ClassicValidator2().validate(ctx);
  const type = parseInt(v.get('path.type'));
  const id = v.get('path.id');
  const art = await Art.getData(id, type);
  if (!art) {
    throw new NotFound();
  }

  const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
  ctx.body = {
    art,
    like_status: like
  };
});

router.get('/:type/:id/favor', new Auth().authority, async ctx => {
  const v = await new ClassicValidator2().validate(ctx);
  const type = parseInt(v.get('path.type'));
  const id = v.get('path.id');
  const art = await Art.getData(id, type);
  if (!art) {
    throw new NotFound();
  }

  const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
  ctx.body = {
    fav_nums: art.fav_nums,
    like_status: like
  };
});

const getArtByIndex = async (i = 1, ctx) => {
  const flow = await Flow.findOne({
    where: {
      index: i
    }
  });
  if (!flow) {
    throw new NotFound();
  }
  const art = await Art.getData(flow.art_id, flow.type);
  const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
  art.setDataValue('index', flow.index);
  art.setDataValue('like_status', likePrevious);
  return art;
};

module.exports = router;

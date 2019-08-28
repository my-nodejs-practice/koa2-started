const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/token'
});
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator');
// const { Success } = require('@src/core/http_exception');
const { LoginType } = require('../../lib/enum');
const { generateToken } = require('@src/core/util');
const User = require('../../model/user');
const Auth = require('@src/middlewares/authority');
const WxManager = require('../../services/wx');

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_MINI_PROGRAM:
      token = await WxManager.code2Token(v.get('body.account'));
      break;
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'));
      break;
    case LoginType.USER_MOBILE:
      break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
  }
  ctx.body = {
    token
  };
  // throw new Success('校验成功');
});

router.post('/verify', async ctx => {
  const v = await new NotEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'));
  ctx.body = {
    result
  };
});

async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret);
  return generateToken(user.id, Auth.USER);
}

module.exports = router;

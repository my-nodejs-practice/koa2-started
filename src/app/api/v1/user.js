const Router = require('@koa/router');
const router = new Router({
  prefix: '/v1/user'
});
const { RegisterValidator } = require('../../validators/validator');
const { Success } = require('@src/core/http_exception');
const User = require('../../model/user');

router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx);
  // 保存到数据库
  await User.create({
    nickname: v.get('body.nickname'),
    email: v.get('body.email'),
    password: v.get('body.password1')
  });
  // 回复客户端
  throw new Success('注册成功');
});

module.exports = router;

const basicAuth = require('basic-auth');

const auth = async (ctx, next) => {
  const userToken = basicAuth(ctx.req);
  ctx.body = {
    token: userToken
  };
};

module.exports = auth;

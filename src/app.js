require('module-alias/register');

const Router = require('@koa/router');
const Koa = require('koa');
const app = new Koa();
const requireDirectory = require('require-directory');
const routes = requireDirectory(module, './app/api/v1');
// console.log('routes::', routes);

for (const key in routes) {
  if (routes[key] instanceof Router) {
    app.use(routes[key].routes());
  }
}

// const bookRouter = require('./app/api/v1/book');
// const classicRouter = require('./app/api/v1/classic');

// app.use(bookRouter.routes());
// app.use(classicRouter.routes());

// // logger
// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.get('X-Response-Time');
//   console.log(`${ctx.method} ${ctx.url} - ${rt}`);
// });

// // x-response-time
// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   ctx.set('X-Response-Time', `${ms}ms`);
// });

// app.use(async ctx => {
//   // console.log(ctx);
//   ctx.body = 'Hello World!';
// });

// app.on('error', (err, ctx) => {
//   console.error('server error', err, JSON.stringify(ctx));
// });

app.listen(3000);

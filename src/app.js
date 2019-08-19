require('module-alias/register');

const Koa = require('koa');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');
const app = new Koa();

app.use(catchError);
InitManager.initCore(app);

app.listen(3000);

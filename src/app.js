require('module-alias/register');

const Koa = require('koa');
const path = require('path');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const compress = require('koa-compress');
const app = new Koa();

require('./app/model/user');

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//     // sequelize.close();
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

app.use(catchError);
app.use(bodyParser());
InitManager.initCore(app);
app.use(compress()); // 压缩
app.use(static(path.resolve(__dirname, './static')));

app.listen(global.config.port);

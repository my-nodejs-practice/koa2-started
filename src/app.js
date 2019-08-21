require('module-alias/register');

const Koa = require('koa');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');
const bodyParser = require('koa-bodyparser');
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

app.listen(3000);

require('module-alias/register');

const Koa = require('koa');
const InitManager = require('./core/init');
const catchError = require('./middlewares/exception');
const app = new Koa();

const { sequelize } = require('./core/db');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // sequelize.close();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(catchError);
InitManager.initCore(app);

app.listen(3000);

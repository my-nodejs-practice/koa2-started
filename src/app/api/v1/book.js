const Router = require('@koa/router');
// const { ParameterException } = require('@src/core/http_exception');
const Auth = require('@src/middlewares/authority');
const HotBook = require('@models/hotBook');
const Book = require('@models/book');
const { IdValidator } = require('../../validators/validator');

const router = new Router({
  prefix: '/v1/book'
});

router.get('/hot_list', new Auth().authority, async ctx => {
  const books = await HotBook.getAll();
  ctx.body = {
    code: 0,
    data: {
      ...books
    }
  };

  // throw new global.exception.HttpException('出错了！', 99999, 500);
});

router.get('/:id/detail', new Auth().authority, async ctx => {
  // 1、校验前端传过来的参数
  const v = await new IdValidator().validate(ctx);
  // 2、使用参数从数据库查询出数据
  const book = await new Book().getDetailById(v.get('path.id'));
  // 3、返回数据给前端
  ctx.body = {
    code: 0,
    data: { ...book.data }
  };
});

module.exports = router;

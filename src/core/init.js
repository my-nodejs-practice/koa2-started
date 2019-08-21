const Router = require('@koa/router');
const requireDirectory = require('require-directory');

class InitManager {
  // 入口方法
  static initCore(app) {
    InitManager.app = app; // koa实例
    InitManager.loadRouters();
    // InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  static loadConfig() {
    global.config = require('../config/index');
  }

  /**
   * 自动寻找并加载指定目录文件路由
   */
  static loadRouters() {
    requireDirectory(module, `${process.cwd()}/src/app/api/v1`, {
      visit: mod => {
        if (mod instanceof Router) {
          InitManager.app.use(mod.routes());
        }
      }
    });
  }
  /**
   * 将异常类绑定到全局变量上，方便后续使用。
   */
  // static loadHttpException() {
  //   global.exception = require('./http_exception');
  // }
}

module.exports = InitManager;

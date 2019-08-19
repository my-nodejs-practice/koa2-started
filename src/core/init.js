const Router = require('@koa/router');
const requireDirectory = require('require-directory');

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
  }
  static initLoadRouters() {
    requireDirectory(module, `${process.cwd()}/src/app/api/v1`, {
      visit: mod => {
        if (mod instanceof Router) {
          InitManager.app.use(mod.routes());
        }
      }
    });
  }
}

module.exports = InitManager;

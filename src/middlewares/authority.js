const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../core/http_exception');

// const auth = async (ctx, next) => {
//   const userToken = basicAuth(ctx.req);
//   let decode;
//   if (!userToken || !userToken.name) {
//     throw new Forbbiden();
//   }
//   try {
//     decode = jwt.verify(userToken.name, global.config.security.secretKey);
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY0NTg2NjQsImV4cCI6MTU2NjU0NTA2NH0.UmGmjcZJOLH5U4FawNyfHLFPYLr6hDGgRbUK7xcTbII
//       throw new Forbbiden('token已过期');
//     } else {
//       // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY0NTg2NjQsImV4cCI6MTU2NjU0NTA2NH0.UmGmjcZJOLH5U4FawNyfHLFPYLr6hDGgRbUK7xcTbII123
//       throw new Forbbiden('token不合法');
//     }
//   }
//   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY4NzcxMDcsImV4cCI6MTU2Njk2MzUwN30.k2Phh5p0NtjyfZdt8XBdqttogTpRbhNIcpMUecukvw0
//   // console.log(`decode::${JSON.stringify(decode)}`); // decode::{"uid":1,"scope":2,"iat":1566877107,"exp":1566963507}
//   ctx.auth = {
//     uid: decode.uid,
//     scope: decode.scope
//   };
//   await next();
// };

class Auth {
  constructor(role = 1) {
    this.role = role;
    Auth.USER = 8;
    Auth.ADMIN = 16;
    Auth.SUPER_ADMIN = 32;
  }
  get authority() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req);
      let decode;
      if (!userToken || !userToken.name) {
        throw new Forbbiden();
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY0NTg2NjQsImV4cCI6MTU2NjU0NTA2NH0.UmGmjcZJOLH5U4FawNyfHLFPYLr6hDGgRbUK7xcTbII
          throw new Forbbiden('token已过期');
        } else {
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY0NTg2NjQsImV4cCI6MTU2NjU0NTA2NH0.UmGmjcZJOLH5U4FawNyfHLFPYLr6hDGgRbUK7xcTbII123
          throw new Forbbiden('token不合法');
        }
      }
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInNjb3BlIjoyLCJpYXQiOjE1NjY4NzcxMDcsImV4cCI6MTU2Njk2MzUwN30.k2Phh5p0NtjyfZdt8XBdqttogTpRbhNIcpMUecukvw0
      // console.log(`decode::${JSON.stringify(decode)}`); // decode::{"uid":1,"scope":2,"iat":1566877107,"exp":1566963507}
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }
}

module.exports = Auth;

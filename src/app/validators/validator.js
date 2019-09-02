const { Rule, LinValidator } = require('@src/core/lin_validator');
const User = require('../model/user');
const { LoginType, ArtType } = require('../lib/enum');

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    this.nickname = [new Rule('isLength', '昵称长度限制在4~32个字符', { min: 4, max: 32 })];
    this.email = [new Rule('isEmail', '邮箱格式错误')];
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ];
    this.password2 = this.password1;
  }
  /**
   * 密码校验（约定以validate开头的参数自定义校验function)
   * @param {object} vals 客户端参数
   */
  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }
  /**
   * 邮箱校验（约定以validate开头的参数自定义校验function)
   * @param {object} vals 客户端参数
   */
  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      throw new Error('Email已存在');
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [new Rule('isLength', '账号长度不符合4-32个字符的规则', { min: 4, max: 32 })];
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', 'secret长度不符合6-128个字符的规则', { min: 6, max: 128 })
    ];
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type不能为空');
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type不合法');
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [new Rule('isLength', '不允许为空', { min: 1 })];
  }
}

class LikeValidator extends LinValidator {
  constructor() {
    super();
    this.art_id = [new Rule('isInt', '需要是正整数', { min: 1 })];
  }
  validateType(vals) {
    if (!vals.body.type) {
      throw new Error('type不能为空');
    }
    if (!ArtType.isThisType(vals.body.type)) {
      throw new Error('type不合法');
    }
  }
}

class ClassicValidator extends LinValidator {
  constructor() {
    super();
    this.index = [new Rule('isInt', '需要正整数', { min: 1 })];
  }
}

class ClassicValidator2 extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule('isInt', '需要正整数', { min: 1 })];
  }
  validateType(vals) {
    const type = parseInt(vals.path.type);
    if (!type) {
      throw new Error('type不能为空');
    }
    if (!ArtType.isThisType(type)) {
      throw new Error('type不合法');
    }
  }
}

module.exports = {
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  ClassicValidator2
};

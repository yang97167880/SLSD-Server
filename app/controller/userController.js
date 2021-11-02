'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx, service } = this
    const loginTransfer = {
      account: { type: 'string', required: true, allowEmpty: false }, // 账户名
      password: { type: 'string', required: true, allowEmpty: false } // 密码
    }
    try {
      ctx.validate(loginTransfer);
      const payload = ctx.request.body || {};
      payload.timestamp = ctx.helper.parseTime(new Date(), '{yyyy}{mm}{dd}{hh}{ii}{ss}');
      const data = await service.userService.login(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}

module.exports = UserController;
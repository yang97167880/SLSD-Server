'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async list() {
    const { ctx, service } = this
    try {
      const data = await service.roleService.list();
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}
module.exports = RoleController;
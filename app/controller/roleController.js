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
  async set_power() {
    const { ctx, service } = this
    const setTransfer = {
      roleId: { type: 'string', required: true, allowEmpty: false, min: 19, max: 19, trim: true, format: /^\d+$/ },
      power: {
        type: 'array', itemType: 'string', required: true, role: {
          type: 'string', allowEmpty: false, min: 19, max: 19, trim: true, format: /^\d+$/
        }
      }
    }
    try {
      ctx.validate(setTransfer);
      const payload = ctx.request.body || {};
      const data = await service.roleService.set_power(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}
module.exports = RoleController;
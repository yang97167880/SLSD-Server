'use strict';

const Controller = require('egg').Controller;

class PowerController extends Controller {
  async list() {
    const { ctx, service } = this
    try {
      const data = await service.powerService.list();
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}
module.exports = PowerController;
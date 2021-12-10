'use strict';

const Controller = require('egg').Controller;

class SensorController extends Controller {
  async list() {
    const { ctx, service } = this
    const listTransfer = {
      pageNum: { type: 'number', required: true, allowEmpty: false }, // 页码
      pageSize: { type: 'number', required: true, allowEmpty: false } // 页长
    }
    try {
      ctx.validate(listTransfer);
      const payload = ctx.request.body || {};
      const data = await service.sensorService.list(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}

module.exports = SensorController;
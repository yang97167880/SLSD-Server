'use strict';

const Controller = require('egg').Controller;

class AlarmController extends Controller {
  async list() {
    const { ctx, service } = this
    const listTransfer = {
      pageNum: { type: 'number', required: true, allowEmpty: false }, // 页码
      pageSize: { type: 'number', required: true, allowEmpty: false } // 页长
    }
    try {
      ctx.validate(listTransfer);
      const payload = ctx.request.body || {};
      const data = await service.alarmService.list(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
  async add() {
    const { ctx, service } = this
    const addTransfer = {
      sensorId: { type: 'string', required: true, allowEmpty: false, min: 19, max: 19, trim: true, format: /^\d+$/ },
      rangeMax: { type: 'number', required: true, allowEmpty: false },
      rangeMin: { type: 'number', required: true, allowEmpty: false },
      isRange: { type: 'boolean', required: true, allowEmpty: false }
    }
    try {
      ctx.validate(addTransfer);
      const payload = ctx.request.body || {};
      const data = await service.alarmService.add(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}

module.exports = AlarmController;
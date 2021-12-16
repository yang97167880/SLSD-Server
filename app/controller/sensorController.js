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
  async add() {
    const { ctx, service } = this
    const addTransfer = {
      name: { type: 'string', required: false, allowEmpty: false }, // 传感器编号
      categoryId: { type: 'string', required: false, allowEmpty: false } // 分类ID
    }
    try {
      ctx.validate(addTransfer);
      const payload = ctx.request.body || {};
      const data = await service.sensorService.add(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
  async search() {
    const { ctx, service } = this
    const searchTransfer = {
      categoryId: { type: 'string', required: false, allowEmpty: false } // 分类ID
    }
    try {
      ctx.validate(searchTransfer);
      const payload = ctx.request.body || {};
      const data = await service.sensorService.search(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
  async del() {
    const { ctx, service } = this
    const deleteTransfer = {
      id: { type: 'string', required: true, allowEmpty: false, min: 19, max: 19, trim: true, format: /^\d+$/ } //警告列表的id
    }
    try {
      ctx.validate(deleteTransfer);
      const payload = ctx.request.body || {};
      const data = await service.sensorService.del(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
  async category_list() {
    const { ctx, service } = this
    try {
      const data = await service.sensorService.category_list();
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
  async category_add() {
    const { ctx, service } = this
    const addTransfer = {
      type: { type: 'string', required: true, allowEmpty: false },  //  类型
      name: { type: 'string', required: true, allowEmpty: false }, // 分类
    }
    try {
      ctx.validate(addTransfer);
      const payload = ctx.request.body || {};
      const data = await service.sensorService.category_add(payload);
      ctx.helper.result({ ctx, data, status: 200 });
    } catch (err) {
      ctx.helper.result({ ctx, data: { msg: err }, status: 500 });
    }
  }
}

module.exports = SensorController;
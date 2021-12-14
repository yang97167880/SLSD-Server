'use strict';

const Controller = require('egg').Controller;

class SensorController extends Controller {
  async get() {
    const { ctx, app } = this;
    const data = ctx.args[0] || {};
    const nsp = app.io.of('/')
    try {
      data.value = Math.floor(Math.random() * 10)
      nsp.emit('sensor', { ...data, time: ctx.helper.parseTime(new Date()) });
    } catch (err) {
      console.log(err)
      nsp.emit('sensor', { errorMsg: err });
    }
  }
  async count() {
    const { ctx, app, service } = this;
    const data = ctx.args[0] || {};
    const nsp = app.io.of('/console')
    try {
      let payload = {
        nsp,
        token: ctx.socket.handshake.query.token,
        socket: ctx.socket,
        helper: ctx.helper,
        action: data.action,
      };
      const res = await service.core.recordService.count(payload);
      if (res) {
        nsp.emit(ctx.socket.id, ctx.helper.socketMsg('task_count', { res, message: 'success' }, { client: ctx.socket.id }))
      } else {
        nsp.emit(ctx.socket.id, ctx.helper.socketMsg('task_count', { message: 'fail' }, { client: ctx.socket.id }))
      }
    } catch (err) {
      nsp.emit(ctx.socket.id, ctx.helper.socketMsg('task_count', { message: err }, { client: ctx.socket.id }));
    }
  }
}

module.exports = SensorController
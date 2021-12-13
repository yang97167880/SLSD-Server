'use strict';

const Controller = require('egg').Controller;

class RecordController extends Controller {
  async record() {
    const { ctx, app, service } = this;
    const data = ctx.args[0] || {};
    const nsp = app.io.of('/connect')
    try {
      if (data.key_id !== undefined && data.key_id !== null) {
        let payload = {
          nsp,
          token: ctx.socket.handshake.query.token,
          socket: ctx.socket,
          helper: ctx.helper,
          key_id: data.key_id,
          action: data.action,
          content: ''
        };
        if (data.content !== null) {
          payload.content = JSON.stringify(data.content)
        }
        const res = await service.core.recordService.record(payload);
        if (res) {
          nsp.emit(ctx.socket.id, ctx.helper.socketMsg('record', { key_id: data.key_id, action: data.action, message: 'success' }, { client: ctx.socket.id }))
        } else {
          nsp.emit(ctx.socket.id, ctx.helper.socketMsg('record', { key_id: data.key_id, action: data.action, message: 'fail' }, { client: ctx.socket.id }))
        }
      } else {
        nsp.emit(ctx.socket.id, ctx.helper.socketMsg('record', { key_id: data.key_id, action: data.action, message: 'key_id undefined' }, { client: ctx.socket.id }))
      }
    } catch (err) {
      nsp.emit(ctx.socket.id, ctx.helper.socketMsg('record', { key_id: data.key_id, action: data.action, message: err }, { client: ctx.socket.id }));
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

module.exports = RecordController
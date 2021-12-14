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
}

module.exports = SensorController
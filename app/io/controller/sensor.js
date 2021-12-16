'use strict';

const Controller = require('egg').Controller;

class SensorController extends Controller {
  async get() {
    const { ctx, app } = this;
    const data = ctx.args[0] || {};
    const nsp = app.io.of('/')
    try {
      if (Array.isArray(data)) {
        const list = await app.redis.hgetall('sensor.value')
        const res = []
        //data.map(v => list[v] == undefined ? res.push('sensor no exist!') : res.push(JSON.parse(temp)))
        data.map(v => {
          if (list[v] == undefined) res.push('sensor no exist!')
          else {
            res.push({
              value: Math.floor(Math.random() * 20),
              time: 0
            })
          }
        })
        nsp.emit('sensor', { list: res });
      } else {
        nsp.emit('sensor', { error: 'params error!' });
      }
    } catch (err) {
      console.log(err)
      nsp.emit('sensor', { errorMsg: err });
    }
  }
}

module.exports = SensorController
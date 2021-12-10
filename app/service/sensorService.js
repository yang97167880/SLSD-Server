'use strict';

const Service = require('egg').Service;

class SensorService extends Service {
  async list(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor = await database.sensor.page()
  }
}

module.exports = SensorService;
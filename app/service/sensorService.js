'use strict';

const Service = require('egg').Service;

class SensorService extends Service {
  async list(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor = await database.sensor.select()
    return sensor
  }
  async category_add(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor_category = await database.sensor.save({ id: await app.snowflake.uuid(), name: params.name })
    return sensor_category
  }
}

module.exports = SensorService;
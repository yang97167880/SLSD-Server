'use strict';

const Service = require('egg').Service;

class SensorService extends Service {
  async list(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor = await database.sensor.page({
      limit: Number(params.pageSize | 0),
      offset: Number(params.pageNum - 1 | 0) * Number(params.pageSize | 0)
    })
    return sensor
  }
  async add(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor_category = await database.sensor.category.get({ id: params.categoryId })
    if (sensor_category == null) return 'ADD FAIL'
    else {
      const res = await database.sensor.save({ id: await app.snowflake.uuid(), name: params.name, status: '关闭', categoryId: params.categoryId })
      if (res.affectedRows == 1) return 'SUCCESS'
      return 'ADD FAIL'
    }
  }
  async category_add(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor_category = await database.sensor.category.get({ name: params.name })
    if (sensor_category == null) {
      const res = await database.sensor.category.save({ id: await app.snowflake.uuid(), name: params.name, type: params.type })
      if (res.affectedRows == 1) return 'SUCCESS'
      return 'ADD FAIL'
    } else {
      return 'SENSOR CATEGORY IS EXIST'
    }
  }
  async category_list() {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor_category = await database.sensor.category.select()
    return sensor_category
  }
}

module.exports = SensorService;
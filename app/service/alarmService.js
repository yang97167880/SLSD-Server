'use strict';

const Service = require('egg').Service;

class AlarmService extends Service {
  async list(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const alarm = await database.alarm.page({
      limit: Number(params.pageSize | 0),
      offset: Number(params.pageNum - 1 | 0) * Number(params.pageSize | 0)
    })
    for (const v of alarm.items) {
      const sensor = await database.sensor.get({ id: v.sensorId })
      const sensorCategory = await database.sensor.category.get({ id: sensor.categoryId })
      v.sensorType = sensorCategory.type + ` [${sensorCategory.name}]`
      v.sensorName = sensor.name
      v.isRange == 1 ? v.isRange = true : v.isRange = false
    }
    return alarm
  }
  async add(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const sensor = await database.sensor.get({ id: params.sensorId })
    if (sensor == null) return 'SENSOR NO EXIST'
    else {
      const alarm = await database.alarm.get({ sensorId: params.sensorId })
      if (alarm == null) {
        params.isRange ? params.isRange = '1' : params.isRange = '0'
        const res = await database.alarm.save({
          id: await app.snowflake.uuid(),
          ...params
        })
        if (res.affectedRows == 1) return 'SUCCESS'
        return 'ADD FAIL'
      }
      return 'ALARM EXIST'
    }
  }
}

module.exports = AlarmService;
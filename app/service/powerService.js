'use strict';

const Service = require('egg').Service;

class PowerService extends Service {
  async list() {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const power = database.power.select()
    return power
  }
}

module.exports = PowerService;
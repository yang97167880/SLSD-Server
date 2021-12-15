'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async list() {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const power = database.role.select()
    return power
  }
  async set_power(params) {
    const { app } = this
    const transaction = await app.Helper.prototype.transaction(app)
    const res = await transaction.role.setPower(params)
    if (res.status) return 'SUCCESS'
    else return 'SET POWER FAIL'
  }
}

module.exports = RoleService;
'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async list() {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const power = database.role.select()
    return power
  }
}

module.exports = RoleService;
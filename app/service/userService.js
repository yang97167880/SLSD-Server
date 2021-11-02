'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(params) {
    const { app } = this
    const user = await app.database.table.user.get({ account: params.account })
    return user
  }
}

module.exports = UserService;
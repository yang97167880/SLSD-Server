'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const user = await database.user.get({ account: params.account, password: params.password })
    if (user != null) {
      if (user.role == null || user.role == "") return 'USER UNAUTHORITY'
      const token = await app.jwt.sign({ id: user.id, timestamp: params.timestamp }, app.config.jwt.secret, { expiresIn: 60 * 60 * 12 });
      const result = { token: token }
      return result
    }
    return 'ACCOUNT OR PASSWORD WRONG'
  }
  async get(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const user = await database.user.get({ id: params.decode.id })
    return user
  }
  async set_role(params) {
    const { app } = this
    const database = await app.Helper.prototype.database(app)
    const role = await database.role.get({ id: params.roleId })
    if (role == null) return 'ROLE ERROR'
    else {
      const res = await database.user.edit({ role: role.instruct }, { where: { id: params.decode.id } })
      if (res.affectedRows == 1) return 'SUCCESS'
      return 'SET FAIL'
    }
  }
}

module.exports = UserService;
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
      const result = { currentUser: { name: user.account, avatar: user.avatar, roles: [user.role], token: token } }
      return result
    }
    return 'ACCOUNT OR PASSWORD WRONG'
  }
}

module.exports = UserService;
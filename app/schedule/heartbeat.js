const Subscription = require('egg').Subscription;

class Heartbeat extends Subscription {
  static get schedule() {
    return {
      interval: '60s', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }
  async subscribe() {
    const { app } = this
    try {
      let db = await app.mysql.get('core');
      if (db === undefined) throw 'db client unconnected';
      await db.query('select 1')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Heartbeat;
const Subscription = require('egg').Subscription;

class Heartbeat extends Subscription {
  static get schedule() {
    return {
      interval: '10s', // 1 分钟间隔
      type: 'worker', // 指定所有的 worker 都需要执行
    };
  }
  async subscribe() {
    const { app } = this
    try {
      let db = await app.mysql.get('Hydropower_Sensor_2021');
      await db.query('select 1')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Heartbeat;
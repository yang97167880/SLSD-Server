'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { socket } = ctx;
    //const query = socket.handshake.query;
    // if (query.token === undefined) {
    //   socket.disconnect();
    // } else {

    // }
    try {
      // const decrypt = app.jwt.verify(query.token, app.config.jwt.secret);
      // const database = await app.Helper.prototype.database(app)
      // const user = await database.user.get({ id: decrypt.id })
      // if (user != null) { // 验证token

      // } else {
      //   socket.disconnect();
      // }
      socket.conn.on('packet', packet => {
        if (packet.type === 'ping') {
          console.log('success')
        }
      });
      await next();
    } catch (err) {
      socket.disconnect();
    }

  };
};

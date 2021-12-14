'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket } = ctx;
    const query = socket.handshake.query;
    if (query.token === undefined) {
      socket.disconnect();
    } else {
      try {
        const decrypt = app.jwt.verify(query.token, app.config.jwt.secret);
        if (decrypt.id !== undefined && decrypt.id !== null && decrypt.id.length === 19) { // 验证token
          socket.conn.on('packet', packet => {
            if (packet.type === 'ping') {
              console.log('success')
            }
          });
          await next();
        } else {
          socket.disconnect();
        }
      } catch (err) {
        socket.disconnect();
      }
    }
  };
};

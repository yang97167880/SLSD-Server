'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/userRouter')(app);
  require('./router/sensorRouter')(app);
};

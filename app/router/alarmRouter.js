'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/alarm/list', jwt, controller.alarmController.list);
  router.post('/alarm/add', jwt, controller.alarmController.add);
  router.post('/alarm/del', jwt, controller.alarmController.del);
}
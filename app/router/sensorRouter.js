'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/sensor/list', controller.sensorController.list);
  router.post('/sensor/add', controller.sensorController.add);
}
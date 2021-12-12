'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/sensor/list', jwt, controller.sensorController.list);
  router.post('/sensor/add', jwt, controller.sensorController.add);
  router.post('/sensor/category/add', jwt, controller.sensorController.category_add);
}
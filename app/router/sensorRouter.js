'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/sensor/list', jwt, controller.sensorController.list);
  router.post('/sensor/add', jwt, controller.sensorController.add);
  router.post('/sensor/search', jwt, controller.sensorController.search);
  router.post('/sensor/del', jwt, controller.sensorController.del);
  router.post('/sensor/category/add', jwt, controller.sensorController.category_add);
  router.post('/sensor/category/list', jwt, controller.sensorController.category_list);
  app.io.of('/').route('sensor', app.io.controller.sensor.get);
}
'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/role/list', jwt, controller.roleController.list);
  router.post('/role/power/set', jwt, controller.roleController.set_power);
}
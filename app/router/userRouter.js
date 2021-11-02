'use strict';

module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt(app.config.jwt);
  router.post('/user/login', controller.userController.login);
}
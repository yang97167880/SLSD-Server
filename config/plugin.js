'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // cors: { enable: true, package: 'egg-cors' },
  // jwt: { enable: true, package: "egg-jwt" },
  validate: { enable: true, package: 'egg-validate' },
  snowflake: { enable: true, package: 'egg-snowflake' },
  redis: { enable: true, package: 'egg-redis' },
  mysql: { enable: true, package: 'egg-mysql' }
};

/* eslint valid-jsdoc: "off" */

'use strict';
const os = require('os');
/**
 * @ 获取本机ip地址
 */
function getIpAddress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const localhost = getIpAddress()
const host = '49.235.62.192'
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635411631488_6635';
  config.security = { csrf: { enable: false }, domainWhiteList: ['*'] };
  config.snowflake = { client: { machineId: 1, machineIdBitLength: 6, workerIdBitLength: 4, serialIdBitLength: 12 } };
  config.cors = { allowMethods: 'GET,POST,OPTIONS' };
  config.jwt = { secret: '2IGUTaI573626TIz!^ng1rJcRYm^l2c2' }
  config.mysql = {
    host: host, port: '3306',
    user: 'Hydropower_Sensor_2021', password: 'Xb6g0UkkdTalCoz3', database: 'Hydropower_Sensor_2021',
    app: true,
    agent: false
  }
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

'use strict';

module.exports = {
  result: ({ ctx, data = null, status = 200 }) => {
    ctx.body = { data: data }
    ctx.status = status
  },
  /* 格式转换 time ->时间 cFormat->返回格式 {y}-{m}-{d} {h}:{i}:{s} */
  parseTime: (time, cFormat) => {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  parseMsg(action, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);
    return {
      meta,
      data: {
        action,
        payload,
      },
    };
  },
  database: async function (app) {
    const db = await app.mysql.get('core');
    if (db === undefined) throw 'db client unconnected';
    return {
      user: {
        get: async (where) => {
          return await db.get('hs_user', where)
        },
        select: async (params) => {
          return await db.select('hs_user', params)
        },
        page: async (params) => {
          const items = await db.select('hs_user', params);
          const total = await db.count('hs_user', params.where);
          return { items, total };
        },
        save: async (params) => {
          const res = await db.insert('hs_user', {
            id: params.id,
            account: params.account,
            password: params.password,
            createAt: new Date(),
            avatar: params.avatar,
            role: params.role
          });
          return res;
        },
        edit: async (row, options) => {
          return await db.update('hs_user', row, options);
        },
        del: async (where) => {
          return await db.delete('hs_user', where);
        }
      },
      role: {
        get: async (where) => {
          return await db.get('hs_role', where)
        },
        select: async (params) => {
          return await db.select('hs_role', params)
        },
        page: async (params) => {
          const items = await db.select('hs_role', params);
          const total = await db.count('hs_role', params.where);
          return { items, total };
        },
        save: async (params) => {
          const res = await db.insert('hs_role', {
            id: params.id,
            instruct: params.instruct,
            name: params.name,
            describe: params.describe
          });
          return res;
        },
        edit: async (row, options) => {
          return await db.update('hs_role', row, options);
        },
        del: async (where) => {
          return await db.delete('hs_role', where);
        },
        power: {
          get: async (where) => {
            return await db.get('hs_role_power', where)
          },
          select: async (params) => {
            return await db.select('hs_role_power', params)
          },
          page: async (params) => {
            const items = await db.select('hs_role_power', params);
            const total = await db.count('hs_role_power', params.where);
            return { items, total };
          },
          save: async (params) => {
            const res = await db.insert('hs_role_power', {
              id: params.id,
              roleId: params.roleId,
              powerId: params.powerId
            });
            return res;
          },
          edit: async (row, options) => {
            return await db.update('hs_role_power', row, options);
          },
          del: async (where) => {
            return await db.delete('hs_role_power', where);
          },
        }
      },
      power: {
        get: async (where) => {
          return await db.get('hs_power', where)
        },
        select: async (params) => {
          return await db.select('hs_power', params)
        },
        save: async (params) => {
          const res = await db.insert('hs_power', {
            id: params.id,
            instruct: params.instruct,
            name: params.name,
            describe: params.describe
          });
          return res;
        },
        edit: async (row, options) => {
          return await db.update('hs_power', row, options);
        },
        del: async (where) => {
          return await db.delete('hs_power', where);
        },
      },
      sensor: {
        get: async (where) => {
          return await db.get('hs_sensor', where)
        },
        select: async (params) => {
          return await db.select('hs_sensor', params)
        },
        page: async (params) => {
          const items = await db.select('hs_sensor', params);
          const total = await db.count('hs_sensor', params.where);
          return { items, total };
        },
        save: async (params) => {
          const res = await db.insert('hs_sensor', {
            id: params.id,
            name: params.name,
            categoryId: params.categoryId,
            status: params.status
          });
          return res;
        },
        edit: async (row, options) => {
          return await db.update('hs_sensor', row, options);
        },
        del: async (where) => {
          return await db.delete('hs_sensor', where);
        },
        category: {
          get: async (where) => {
            return await db.get('hs_sensor_category', where)
          },
          select: async (params) => {
            return await db.select('hs_sensor_category', params)
          },
          page: async (params) => {
            const items = await db.select('hs_sensor_category', params);
            const total = await db.count('hs_sensor_category', params.where);
            return { items, total };
          },
          save: async (params) => {
            const res = await db.insert('hs_sensor_category', {
              id: params.id,
              name: params.name,
              type: params.type
            });
            return res;
          },
          edit: async (row, options) => {
            return await db.update('hs_sensor_category', row, options);
          },
          del: async (where) => {
            return await db.delete('hs_sensor_category', where);
          }
        }
      },
      alarm: {
        get: async (where) => {
          return await db.get('hs_alarm', where)
        },
        select: async (params) => {
          return await db.select('hs_alarm', params)
        },
        page: async (params) => {
          const items = await db.select('hs_alarm', params);
          const total = await db.count('hs_alarm', params.where);
          return { items, total };
        },
        save: async (params) => {
          const res = await db.insert('hs_alarm', {
            id: params.id,
            sensorId: params.sensorId,
            rangeMax: params.rangeMax,
            rangeMin: params.rangeMin,
            isRange: params.isRange
          });
          return res;
        },
        edit: async (row, options) => {
          return await db.update('hs_alarm', row, options);
        },
        del: async (where) => {
          return await db.delete('hs_alarm', where);
        }
      }
    }
  },
  transaction: async function (app) {
    const db = await app.mysql.get('core');
    if (db === undefined) throw 'db client unconnected';
    return {
      role: {
        setPower: async function (params) {
          let state = {}
          const _transaction = await db.beginTransaction();
          try {
            if (params.power.length > 0) {
              for (const v of power) {
                state = await _transaction.insert('hs_role_power', {
                  id: await app.snowflake.uuid(),
                  roleId: params.roleId,
                  powerId: v
                })
              }
              if (state.affectedRows !== 1) throw 'add hs_role_power error';
            }
            await _transaction.commit();
            return { status: true }
          } catch (err) {
            await _transaction.rollback();
            return { status: false, error: err };
          }
        }
      }
    }
  },
  STATUS: {
    NOTPOWER: { code: 994000, msg: 'user not handle power' },// 无操作权限
  }
}
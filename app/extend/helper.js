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
          const res = await db.insert('gs_user', {
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
    }
  },
  STATUS: {
    NOTPOWER: { code: 994000, msg: 'user not handle power' },// 无操作权限
  }
}
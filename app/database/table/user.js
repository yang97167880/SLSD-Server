'use strict';

module.exports = app => {
  return {
    async get(where) {
      const db = await app.mysql.get('core');
      if (db === undefined) throw 'db client unconnected';
      return await db.get('hs_user', where)
    },
    async select(params) {
      const db = await app.mysql.get('core');
      if (db === undefined) throw 'db client unconnected';
      return await db.select('hs_user', params)
    },
    async page() {
      const db = await app.mysql.get('core');
      if (db === undefined) throw 'db client unconnected';
      const items = await db.select('hs_user', params);
      const total = await db.count('hs_user', params.where);
      return { items, total };
    },
    async save(params) {

    },
    async edit(row, options) {

    },
    async del(where) {

    }
  }
}
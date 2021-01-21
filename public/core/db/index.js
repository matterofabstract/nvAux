/**
 *  _____           _____    ____
 * |  __ \         |  __ \  |  _ \
 * | |__) | __  __ | |  | | | |_) |
 * |  _  /  \ \/ / | |  | | |  _ <
 * | | \ \   >  <  | |__| | | |_) |
 * |_|  \_\ /_/\_\ |_____/  |____/
 *
 * RxDB - Our realtime Database to store notes and everything else.
 *
 * More: https://rxdb.info
 */

const { app } = require('electron');
const { addRxPlugin } = require('rxdb');

const database = require('./database');

addRxPlugin(require('pouchdb-adapter-memory'));

(async () => {
  await app.whenReady();
  global.db = await database.getDatabase(
    'nvauxdb',
    'memory'
  );
})();

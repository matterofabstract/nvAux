const path = require('path');
const Store = require('electron-store');
const sqlite3 = require('sqlite3');
const { app } = require('electron');

const store = new Store();

let dbPath;
if (store.get('dbPath')) {
  dbPath = store.get('dbPath');
} else {
  dbPath = store.set('dbPath', String(path.join(app.getPath('appData'), '/nvAux/db.sqlite3')));
}

const db = new sqlite3.Database(dbPath);

db.serialize(function () {
  db.run('CREATE TABLE lorem (info TEXT)');

  var stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (var i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info);
  });
});

db.close();

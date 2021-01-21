/* eslint-disable no-multi-str */
const path = require('path');
const Store = require('electron-store');
const sqlite3 = require('sqlite3');
const fdir = require('fdir');
const { app } = require('electron');

const store = new Store();

// fdir.async(store.get('workingDir')).then((props) =>
//   console.log('1231232121313312', props)
// );
const files = fdir.sync(store.get('workingDir'), { excludeBasePath: true });
// console.log('files @@@@@@@@@@', files);

console.log('app.getPath @@@@@@@@@@', app.getPath('appData'));

let dbPath;
if (store.get('dbPath')) {
  dbPath = store.get('dbPath');
} else {
  dbPath = store.set('dbPath', String(path.join(app.getPath('appData'), '/nvAux/db.sqlite3')));
}

const db = new sqlite3.Database(dbPath);

db.serialize(function () {
  // TODO check if table exists, otherwise create
  db.run(
    'CREATE TABLE `notes` (\
      `filename` TEXT(120),\
      `content` LONGTEXT,\
      `file_type` TEXT(35),\
      `date_added` DATETIME,\
      `date_modified` DATETIME,\
      `last_accessed` DATETIME\
    )'
  );

  var stmt = db.prepare('INSERT INTO notes (filename, content) VALUES (?,?)');
  // for (var i = 0; i < 10; i++) {
  //   stmt.run(`Ipsum ${i}`, `content ${i}`);
  // }

  files.forEach((f) => stmt.run(`${f}`, `content for ${f}`));

  stmt.finalize();

  // db.each('SELECT rowid AS id, filename,content FROM notes', function (err, row) {
  //   console.log(row.id + ': ' + row.filename);
  // });
});

db.close();

const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const { ipcRenderer } = require('electron');

const diaryFolder = require('os').homedir() + '/Documents/diary';
// const incomingDir = diaryFolder + '/incoming';

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') {
        // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') {
        // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || (caughtErr && curDir === path.resolve(targetDir))) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

if (fs.existsSync(incomingDir)) {
  console.log('Incoming Photo Directory: ', incomingDir);
} else {
  console.log(
    'Incoming Photo Directory (' + incomingDir + ") doesn't exist. Creating..."
  );
  // fs.mkdirSync(incomingDir, { recursive: true});
  mkDirByPathSync(incomingDir);
}

// Initialize watcher.
let watcher = chokidar.watch(incomingDir, {
  ignored: /(^|[/\\])\../,
  persistent: true
});

// Add event listeners.
watcher.on('add', path => {
  const filename = path.split('/').pop();
  const SANTA_CODE = process.env.SANTA_CODE;
  if (SANTA_CODE) {
    fs.rename(
      path,
      photoLibrary + '/' + process.env.SANTA_CODE + '/' + filename,
      err => {
        if (err) throw err;
        // console.log('Moved ' + path + ' to ' + photoLibrary + '/' + process.env.SANTA_CODE + '/' + filename)
      }
    );
  }
  // ipcRenderer.on('info' , function(event , data){ console.log('1123456789 ', data.msg) });
});
// .on('change', path => {
//    console.log('change- ', process.env.SANTA_CODE);
//  })
// .on('unlink', path => {
//   // console.log('unlink- ', process.env.SANTA_CODE);
// });

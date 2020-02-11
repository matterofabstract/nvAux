require('./core/');

const path = require('path');
const { app, BrowserWindow, nativeImage } = require('electron');

const { isDev } = require('./utils');

let mainWindow = null;

/**
 * Electron Main Process File
 */

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 680,
    title: 'nvAux',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
    minWidth: 100,
    minHeight: 100
  });

  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.setTitle('nvAux');
  //   console.log('mainWindow.getTitle() @@@@@@@@@@', mainWindow.getTitle());
  // });
}

app.on('ready', () => {
  createWindow();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

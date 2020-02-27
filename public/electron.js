require('./core/');

const path = require('path');
const { app, BrowserWindow } = require('electron');

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
  mainWindow.loadURL(isDev() ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.setHasShadow(false);
});

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q.
  // Exceptions include System Preferences, App Store,
  // Though there is no way to re-open the main window
  // through the menu, but you can click on the dock icon.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});

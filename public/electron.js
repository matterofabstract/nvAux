/**
 * You have arrived.
 *
 * nvAux's [electron] main process entrypoint file.
 *
 * 1. Load the nvAux core framework
 * 2. Create and manage app window lifecylce
 */

require('./core/');

const { app, BrowserWindow } = require('electron');

const { getRenderProcessUrl } = require('./utils');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 200,
    minHeight: 280,
    width: 480,
    height: 680,
    title: 'nvAux',
    frame: false,
    transparent: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(getRenderProcessUrl());
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
    mainWindow.show();
});

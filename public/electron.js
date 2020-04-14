/**
 * Electron Main Process File
 */

require('./core/');

const path = require('path');
const Store = require('electron-store');
const fdir = require('fdir');
const { app, BrowserWindow } = require('electron');

const { isDev } = require('./utils');

const store = new Store();

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 680,
    title: 'nvAux',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
    minWidth: 200,
    minHeight: 280,
  });
}

app.on('ready', () => {
  createWindow();
  mainWindow.loadURL(isDev() ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.setHasShadow(false);
  fdir.async(store.get('workingDir')).then((props) =>
    // Send to Render process...
    console.log('1231232121313312', props)
  );
  const files = fdir.async(store.get('workingDir'));
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

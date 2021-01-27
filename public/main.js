/**             ___
 *             / _ \
 *  _ ____   _/ /_\ \_   ___  __
 * | '_ \ \ / /  _  | | | \ \/ /
 * | | | \ V /| | | | |_| |>  <
 * |_| |_|\_/ \_| |_/\__,_/_/\_\
 * =============================
 * © 2021 Abstractly, LLC. All rights reserved.
 *
 * You have arrived.
 *
 * nvAux's [electron] main process entrypoint file. The Electron side of things
 * is fairly minimal. Besides getting access to system-level features and
 * control through Electron, nvAux lives in the frontend.
 *
 * 1. Setup and create the Electron window that nvAux will run in.
 * 2. Listens for and manages nvAux window lifecylce events.
 *
 */

require('./core');
const Store = require('electron-store');

const { app, BrowserWindow } = require('electron');

const { getRenderProcessUrl, getPreloadPath } = require('./core/utils');

const store = new Store();

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minWidth: 300,
    minHeight: 36,
    width: store.get('window_dimensions.width') || 580,
    height: store.get('window_dimensions.height') || 138,
    title: 'nvAux',
    frame: false,
    transparent: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: getPreloadPath()
    }
  });
  mainWindow.loadURL(getRenderProcessUrl());
}

/**
 * Emitted once, when Electron has finished initializing. On macOS, launchInfo
 * holds the userInfo of the NSUserNotification that was used to open the
 * application, if it was launched from Notification Center. You can also call
 * app.isReady() to check if this event has already fired and app.whenReady()
 * to get a Promise that is fulfilled when Electron is initialized.
 */
app.on('ready', async () => {
  createWindow();
});

/**
 * Emitted when all windows have been closed. If you do not subscribe to this
 * event and all windows are closed, the default behavior is to quit the app;
 * however, if you subscribe, you control whether the app quits or not. If the
 * user pressed Cmd + Q, or the developer called app.quit(), Electron will first
 * try to close all the windows and then emit the will-quit event, and in this
 * case the window-all-closed event would not be emitted.
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * Emitted when the application is activated. Various actions can trigger this
 * event, such as launching the application for the first time, attempting to
 * re-launch the application when it's already running, or clicking on the
 * application's dock or taskbar icon.
 */
app.on('activate', () => {
  mainWindow.show();
});

/**
 * The ipcMain module is an Event Emitter. When used in the main process, it
 * handles asynchronous and synchronous messages sent from a renderer process
 * (web page). Messages sent from a renderer will be emitted to this module.
 */

const { app, ipcMain } = require('electron');
const Store = require('electron-store');

const store = new Store();

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('hide_app', (event) => {
  app.hide();
});

ipcMain.on('save_window_dimensions', (event, arg) => {
  store.set('window_dimensions', arg);
});

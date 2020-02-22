const { app, ipcMain } = require('electron');

/**
 * The ipcMain module is an Event Emitter. When used in the main process, it
 * handles asynchronous and synchronous messages sent from a renderer process
 * (web page). Messages sent from a renderer will be emitted to this module.
 */
ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

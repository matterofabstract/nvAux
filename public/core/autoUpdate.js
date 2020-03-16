/**
 * Check for package updates when the app is opened and whenever the user clicks
 * 'Check for Update' in the appMenu.js
 */

const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');

(async () => {
  await app.whenReady();
  console.log('lets check for updates in the new autoUpdate.js file!');
  // autoUpdater.on('update-downloaded', () => {
  //   mainWindow.webContents.send('update_downloaded');
  // });

  app.on('restart_app', () => {
    autoUpdater.quitAndInstall();
  });
})();

const { app, BrowserWindow } = require('electron');
const { isDev } = require('../utils');

/**
 * Things to run when only in development-mode.
 */

(async () => {
  if (isDev) {
    await app.whenReady();
    /**
     * Developer Tools, namely React Developer Tools (there are others available)
     * More: https://github.com/MarshallOfSound/electron-devtools-installer
     */
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
    installExtension(REACT_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
    // BrowserWindow.getFocusedWindow().webContents.openDevTools('undocked');
  }
})();

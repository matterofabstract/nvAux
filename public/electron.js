const path = require('path');
const { app, BrowserWindow, ipcMain, nativeImage } = require('electron');
const isDev = require('electron-is-dev');

// App Icon. Though `electron-builder` has alt configs
const icoFile = app.getAppPath() + '/assets/icon.png';
const ico = nativeImage.createFromPath(icoFile);
app.dock.setIcon(ico);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 680,
    title: 'nvAux',
    frame: false,
    // darkTheme: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    },
    // maxWidth: 800,
    minWidth: 100
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer');

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }

  mainWindow.on('closed', () => (mainWindow = null));

  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.setTitle('nvAux');
  //   console.log('mainWindow.getTitle() @@@@@@@@@@', mainWindow.getTitle());
  // });
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
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', event => {
  event.sender.send('app_version', { version: app.getVersion() });
});

const { app, Menu, BrowserWindow } = require('electron');

const isMac = process.platform === 'darwin';

const sendOpenPreferencesEvent = () => {
  BrowserWindow.getFocusedWindow().webContents.send('open-preferences', { OPEN: true });
};

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { label: 'Check for updates...', click: sendOpenPreferencesEvent },
            { type: 'separator' },
            { label: 'Preferences', click: sendOpenPreferencesEvent },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }
      ]
    : []),
  // { role: 'fileMenu' }
  // {
  //   label: 'File',
  //   submenu: [isMac ? { role: 'close' } : { role: 'quit' }]
  // },
  // // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            // { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' }
            // {
            //   label: 'Speech',
            //   submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
            // }
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }])
    ]
  }
  // // { role: 'viewMenu' }
  // {
  //   label: 'View',
  //   submenu: [
  //     { role: 'reload' },
  //     { role: 'forcereload' },
  //     { role: 'toggledevtools' },
  //     { type: 'separator' },
  //     { role: 'resetzoom' },
  //     { role: 'zoomin' },
  //     { role: 'zoomout' },
  //     { type: 'separator' },
  //     { role: 'togglefullscreen' }
  //   ]
  // },
  // // { role: 'windowMenu' }
  // {
  //   label: 'Window',
  //   submenu: [
  //     { role: 'minimize' },
  //     { role: 'zoom' },
  //     ...(isMac
  //       ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
  //       : [{ role: 'close' }])
  //   ]
  // },
  // {
  //   role: 'help',
  //   submenu: [
  //     {
  //       label: 'Visit nvAux.com 🚀',
  //       click: async () => {
  //         const { shell } = require('electron');
  //         await shell.openExternal('https://nvaux.com');
  //       }
  //     }
  //   ]
  // }
];

Menu.setApplicationMenu(null);
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

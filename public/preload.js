const { ipcRenderer, shell } = require('electron');
window.ipcRenderer = ipcRenderer;
window.shell = shell;
window.Store = require('electron-store');

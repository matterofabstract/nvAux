const { app, nativeImage } = require('electron');

// App Icon. Though `electron-builder` has alt configs
const icoFile = app.getAppPath() + '/assets/icon.png';
const ico = nativeImage.createFromPath(icoFile);
app.dock.setIcon(ico);

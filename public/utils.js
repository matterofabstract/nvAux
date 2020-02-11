const { app } = require('electron');

const isDev = () => {
  const app = electron.app || electron.remote.app;
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !app.isPackaged;
};

exports.isDev = isDev;

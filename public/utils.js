const path = require('path');
const { app, remote } = require('electron');

const isDev = () => {
  const nvaux = app || remote.app;
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !nvaux.isPackaged;
};

const getSystemInfo = () => ({
  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  platform: process.platform,

  // On macOS -> '10.13.6'
  // On Windows -> '10.0.17763'
  // On Linux -> '4.15.0-45-generic'
  version: process.getSystemVersion()
});

const getRenderProcessUrl = () => (
  isDev()
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
)

exports.isDev = isDev;
exports.getSystemInfo = getSystemInfo;
exports.getRenderProcessUrl = getRenderProcessUrl;

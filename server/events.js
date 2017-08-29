// This file handles the functions to call when certain events are received by the ipc renderer.
const path = require('path');
const fs = require('fs')
const configPath = path.join(__dirname, '../config.json');

// creates config file if it doesn't already exist
// InitConfig creates a config if it does not exist;
// Config must be mirrored in the client app for passing config payloads from client<->server
// TODO: move the initialConfig to another file / share between client / server
// TODO: Convert *sync to asynchronous file ops (faster?)
function initConfig (event) {
  let config = null;

  if (!fs.existsSync(configPath)) {
    const fd = fs.openSync(configPath, 'w');

    const initialConfig = {
      apiServer: '',
      operator: '',
      notificationsEnabled: true,
    };

    fs.writeSync(fd, JSON.stringify(initialConfig, null, '  '), 0, 'utf8');
    fs.closeSync(fd);
  }

  config = require(configPath);
  event.sender.send('config', config);
}

// Handle changing the settings via front end `config.index` reducer
// NOTE: Might not have to use `require` to reload the configure. Maybe use callback on success?
function updateSettings(event, payload) {
  const fd = fs.openSync(configPath, 'w');
  console.log('update-settings:', 'payload', payload, 'old file is:', fd)
  console.log('old file is:', require(configPath))
  fs.writeSync(fd, JSON.stringify(payload, null, '  '), 0, 'utf8');
  fs.closeSync(fd);

  let newConfig = require(configPath);
  console.log('config path going to front end is;', newConfig,)
  console.log('notifications should be ', payload.notificationsEnabled)
  event.sender.send('config', newConfig)
}

module.exports = {
  initConfig,
  updateSettings
};

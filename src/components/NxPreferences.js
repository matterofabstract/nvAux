import React from 'react';
import * as Store from 'electron-store';
const { dialog } = require('electron').remote;

export const NxPreferences = () => {
  const store = new Store();

  const handleSetWorkingDir = () =>
    console.log(
      dialog
        .showOpenDialog({ properties: ['openDirectory'] })
        .then((result) => {
          // console.log(result.canceled);
          store.set('workingDir', result.filePaths[0]);
          // console.log('result  ', result);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  return (
    <div className="preferences-wrapper">
      <h1>nvAux Preferences</h1>
      <div>
        <h3>Working Directory</h3>
        <input type="text" style={{ width: 300 }} value={store.get('workingDir')} />{' '}
        <button onClick={handleSetWorkingDir}>Set...</button>
      </div>
      <hr />
      <div>
        <h3>Summon (Bring-to-Front) Hotkey</h3>
        <input type="text" style={{ width: 60 }} value="⌘." /> <button>Set...</button>
      </div>
    </div>
  );
};

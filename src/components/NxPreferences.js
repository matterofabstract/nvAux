import React from 'react';
// const { dialog } = require('electron').remote;

export const NxPreferences = () => {

  return (
    <div className="preferences-wrapper">
      <h1>Preferences</h1>
      <div>
        <h3>Working Directory</h3>
        <input type="text" style={{ width: 300 }} />{' '}
        <button>Set...</button>
      </div>
      <hr />
      <div>
        <h3>Summon (Bring-to-Front) Hotkey</h3>
        <input type="text" style={{ width: 60 }} value="⌘." /> <button>Set...</button>
      </div>
    </div>
  );
};

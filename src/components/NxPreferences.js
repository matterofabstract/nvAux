import React from 'react';

export const NxPreferences = () => {
  return (
    <div className="preferences-wrapper">
      <h1>nvAux Preferences</h1>
      <div>
        <h3>Summon (Bring-to-Front) Hotkey</h3>
        <input type="text" style={{ width: 60 }} value="⌘." /> <button>Set...</button>
      </div>
      <hr />
    </div>
  );
};

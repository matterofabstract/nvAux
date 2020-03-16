import React, { useState, useEffect } from 'react';
import * as mousetrap from 'mousetrap';

import { NxMediabar } from './NxMediabar';
import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';
import { NxPreferences } from './NxPreferences';
import { NxCloseButton } from './NxCloseButton';
import { NxPreferencesButton } from './NxPreferencesButton';

import '../media/css/style.css';

const { ipcRenderer } = require('electron');

export const NxApp = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  // Global Keyboard Shortcut to open Preferences
  useEffect(() => {
    mousetrap.bind('command+,', () => {
      setShowPreferences(!showPreferences);
    });
  }, [showPreferences]);

  useEffect(() => {
    ipcRenderer.on('open-preferences', (event, { OPEN }) => {
      setShowPreferences(OPEN);
    });
  }, []);

  return (
    <div className="app">
      <NxPreferencesButton togglePreferences={setShowPreferences} showPreferences={showPreferences} />
      <NxCloseButton />
      <NxMediabar />
      {showPreferences ? (
        <NxPreferences />
      ) : (
        <>
          <NxOmnibar />
          <NxFileList />
          <NxFileContent />
        </>
      )}
    </div>
  );
};

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

export const NxApp = () => {
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Setup a listener for Preferences keyboard shortcut
    mousetrap.bind('command+,', () => {
      setShowPreferences(!showPreferences);
    });
  }, [showPreferences]);

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

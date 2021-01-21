import React from 'react';

import { NxCloseButton } from './NxCloseButton';
import { NxPreferencesButton } from './NxPreferencesButton';

export const NxAppTray = ({ setShowPreferences, showPreferences }) => {
  return (
    <div className="flex flex-end">
      <NxPreferencesButton togglePreferences={setShowPreferences} showPreferences={showPreferences} />
      <NxCloseButton />
    </div>
  );
}

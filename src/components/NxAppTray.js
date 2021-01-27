import React from 'react';

import { NxCloseButton } from './NxCloseButton';
import { NxPreferencesButton } from './NxPreferencesButton';

export const NxAppTray = () => {
  return (
    <div className="flex flex-end">
      <NxPreferencesButton />
      <NxCloseButton />
    </div>
  );
}

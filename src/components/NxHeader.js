import React from 'react';

import { NxMediabar } from './NxMediabar';
import { NxAppTray } from './NxAppTray';

export const NxHeader = () => {
  return (
    <div className="flex mb-1" style={{ height: 33 }}>
      <NxMediabar />
      <NxAppTray />
    </div>
  );
}

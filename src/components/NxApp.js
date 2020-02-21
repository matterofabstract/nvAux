import React from 'react';

import { NxMediabar } from './NxMediabar';
import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';
import { NxCloseButton } from './NxCloseButton';

import '../media/css/style.css';

export const NxApp = (props) => {
  return (
    <div className="app">
      <NxCloseButton />
      <NxMediabar />
      <NxOmnibar />
      <NxFileList />
      <NxFileContent />
    </div>
  );
};

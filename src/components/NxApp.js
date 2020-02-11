import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { NxMediabar } from './NxMediabar';
import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';

import '../media/css/style.css';

export const NxApp = (props) => {
  return (
    <div className="app">
      <button className="close-window">
        <FaTimes />
      </button>
      <NxMediabar />
      <NxOmnibar />
      <NxFileList />
      <NxFileContent />
    </div>
  );
};

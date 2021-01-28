import React from 'react';
import { Observer } from 'mobx-react';

import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';
import { NxPreferences } from './NxPreferences';

import { StoreContext } from '../store';
import { usePreferencePanelListener } from '../hooks';

export const NxBody = () => {
  const store = React.useContext(StoreContext);

  usePreferencePanelListener();

  return (
    <Observer>
      {() => (
        store.showPreferences
          ? <NxPreferences />
          : <NxNotesBody />
      )}
    </Observer>
  );
}

const NxNotesBody = () => {
  return (
    <>
      <NxOmnibar />
      <NxFileList />
      <NxFileContent />
    </>
  );
}


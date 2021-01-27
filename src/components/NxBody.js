import React, { useState, useEffect } from 'react';
import { Observer } from 'mobx-react';
import * as mousetrap from 'mousetrap';

import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
import { NxFileContent } from './NxFileContent';
import { NxPreferences } from './NxPreferences';

import { StoreContext } from '../store';


export const NxBody = (props) => {
  const store = React.useContext(StoreContext);
  const [showPreferences, setShowPreferences] = useState(false);


  /**
   * App Preferences
   */
  useEffect(() => {
    mousetrap.bind('command+,', () => setShowPreferences(!showPreferences));
  }, [showPreferences]);

  useEffect(() => {
    window.ipcRenderer.on('open-preferences', (event, { OPEN }) => setShowPreferences(OPEN) );
  }, []);

  return (
    <Observer>{() => (
      store.showPreferences ? (
        <NxPreferences />
      ) : (
        <>
          <NxNotesBody />
        </>
      )
    )}</Observer>
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


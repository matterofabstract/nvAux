import React, { useState, useEffect } from 'react';
import { Provider } from 'rxdb-hooks';
import * as mousetrap from 'mousetrap';

import { NxMediabar } from './NxMediabar';
import { NxAppTray } from './NxAppTray';
import { NxOmnibar } from './NxOmnibar';
import { NxFileList } from './NxFileList';
// import { NxFileContent } from './NxFileContent';
import { NxPreferences } from './NxPreferences';

import { initializeDB } from './initializeDB';

import '../media/css/style.css';

const { ipcRenderer } = require('electron');

export const NxApp = () => {
  const [db, setDb] = useState();
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

  useEffect(() => {
    // Notice that RxDB instantiation is asynchronous; until db becomes available
    // consumer hooks that depend on it will still work, absorbing the delay by
    // setting their state to isFetching:true
    const initDB = async () => {
      const _db = await initializeDB();
      setDb(_db);
    };
    initDB();
  }, []);

  return (
    <Provider db={db}>
      <div className="app">
        <div className="flex mb-3">
          <div style={{ flexGrow: 1 }} />
          <NxMediabar />
          <NxAppTray />
        </div>
        {showPreferences ? (
          <NxPreferences />
        ) : (
          <>
            <NxOmnibar />
            <NxFileList />
            {/* <NxFileContent /> */}
          </>
        )}
      </div>
    </Provider>
  );
};

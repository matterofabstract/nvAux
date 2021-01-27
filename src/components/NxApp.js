import React, { useState, useEffect } from 'react';
import { Provider } from 'rxdb-hooks';

import { NxMediabar } from './NxMediabar';
import { NxAppTray } from './NxAppTray';
import { NxBody } from './NxBody';
import { useWindowSize } from '../hooks';

import { StoreProvider } from '../store';
import { useDebounce } from '../hooks';
import { initializeDB } from './initializeDB';

import '../media/css/style.css';

export const NxApp = () => {
  const [db, setDb] = useState();
  const size = useWindowSize();
  const windowDimensions = useDebounce(size, 500)

  useEffect(() => {
    window.ipcRenderer.send('save_window_dimensions', windowDimensions);
  }, [windowDimensions])

  /**
   * Database
   */
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
    <StoreProvider>
      <Provider db={db}>
        <div className="app">
          <div className="flex mb-3">
            <NxMediabar />
            <NxAppTray />
          </div>
          <NxBody />
        </div>
      </Provider>
    </StoreProvider>
  );
};

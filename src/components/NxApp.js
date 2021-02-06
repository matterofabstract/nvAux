/**
 * NxApp - The highest-level component; the ui starts here.
 *
 * 1. Initialize the Database
 * 2. Initialize save window dimension per users preference
 * 3. Load the app
 */

import React from 'react';
import { Provider } from 'rxdb-hooks';

import { NxVideoPlayer } from './NxVideoPlayer';
import { NxHeader } from './NxHeader';
import { NxBody } from './NxBody';

import { StoreProvider } from '../store';
import { useInitDb, useSaveWindowDimensions } from '../hooks';

import '../media/css/style.css';

export const NxApp = () => {
  const db = useInitDb();
  useSaveWindowDimensions();
  return (
    <StoreProvider>
      <Provider db={db}>
        <div className="app">
          <NxVideoPlayer />
          <NxHeader />
          <NxBody />
        </div>
      </Provider>
    </StoreProvider>
  );
};

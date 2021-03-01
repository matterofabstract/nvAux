/**
 * listens for things related to the app preferences panel
 */
import React, { useEffect } from 'react';
import * as mousetrap from 'mousetrap';

import { StoreContext } from '../store';

export const usePreferencePanelListener = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    mousetrap.bind('command+,', () => store.setShowPreferences(!store.showPreferences));
  }, [store]);

  useEffect(() => {
    window.ipcRenderer && window.ipcRenderer.on('open-preferences', (event, { OPEN }) => store.setShowPreferences(OPEN) );
  }, [store]);
};




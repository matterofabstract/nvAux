import React from 'react';
import { FaCog } from 'react-icons/fa';
import { Observer } from 'mobx-react';

import { StoreContext } from '../store';

export const NxPreferencesButton = () => {
  const store = React.useContext(StoreContext);
  return (
    <Observer>
      {() => (
        <button className="show-preferences" onClick={store.setShowPreferences}>
          <FaCog />
        </button>
      )}
    </Observer>
  );
};

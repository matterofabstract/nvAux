import React from 'react';
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const store = useLocalStore(() => ({
    showPreferences: false,
    omniText: '',

    setShowPreferences: (open=undefined) => {
      store.showPreferences = open || !store.showPreferences;
    },
    setOmniText: (searchString) => {
      store.omniText = searchString;
    }
  }));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

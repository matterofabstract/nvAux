import React from 'react';
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const store = useLocalStore(() => ({
    showPreferences: localStorage.getItem('showPreferences') || false,
    omniText: localStorage.getItem('omniText') || '',

    setShowPreferences: () => {
      store.showPreferences = !store.showPreferences;
      localStorage.setItem('showPreferences', store.showPreferences);
    },
    setOmniText: (searchString) => {
      store.omniText = searchString;
      localStorage.setItem('omniText', searchString);
    }
  }));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

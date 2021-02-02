import React from 'react';
import { useLocalObservable } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const store = useLocalObservable(() => ({
    showPreferences: false,
    omniText: '',
    guidInFocus: '',

    setGuidInFocus: (guid) => {
      store.guidInFocus = guid;
    },
    setShowPreferences: () => {
      store.showPreferences = !store.showPreferences;
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

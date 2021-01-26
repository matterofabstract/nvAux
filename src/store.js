import React from 'react';
import { useLocalStore } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const store = useLocalStore(() => ({
    omniText: localStorage.getItem('omniText') || '',

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

import React from 'react';
import { useLocalObservable } from 'mobx-react';

export const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {

  const store = useLocalObservable(() => ({

    // Media
    showVideoPlayer: false,
    setShowVideoPlayer: () => {
      store.showVideoPlayer = !store.showVideoPlayer;
    },
    toggleShuffle: false,
    setToggleShuffle: () => {
      store.toggleShuffle = !store.toggleShuffle;
    },

    // User Settings
    showPreferences: false,
    setShowPreferences: () => {
      store.showPreferences = !store.showPreferences;
    },

    // Notes
    omniText: '',
    setOmniText: (searchString) => {
      store.omniText = searchString;
    },

    guidInFocus: '',
    setGuidInFocus: (guid) => {
      store.guidInFocus = guid;
    },

    setDeleteNote: (guid) => {
      // query db for note guid and delete it
    },

  }));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

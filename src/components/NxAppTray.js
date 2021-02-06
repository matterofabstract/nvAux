import React from 'react';
import { Observer } from 'mobx-react';

import { NxButton } from './micro/NxButton';

import { StoreContext } from '../store';

export const NxAppTray = () => {
  const store = React.useContext(StoreContext);

  const closeWindow = () => window.ipcRenderer.send('hide_app');
  return (
    <Observer>
      {() => {
        const trayButtonList = [
          { id: 1, icon: 'party', handler: store.setShowVideoPlayer, isActive: store.showVideoPlayer},
          { id: 2, icon: 'shuffle', handler: store.setToggleShuffle, isActive: store.toggleShuffle},
          // { id: 3, icon: 'airplay', handler: store.setShowVideoPlayer, isActive: store.showVideoPlayer},
          { id: 4, icon: 'cog', handler: store.setShowPreferences, isActive: store.showPreferences}
        ];
        return (
          <>
            <div className="flex app-tray">
              {trayButtonList.map(btn => (
                <NxButton
                  key={btn.id}
                  icon={btn.icon}
                  handler={btn.handler}
                  isActive={btn.isActive}
                  classes="text-gray-600 bg-none border-none outline-none"
                />
              ))}
            </div>

            <NxButton
              icon="times"
              handler={closeWindow}
              classes="text-xs text-gray-700 border-none bg-none outline-none"
            />
          </>
        )
      }}
    </Observer>
  );
}

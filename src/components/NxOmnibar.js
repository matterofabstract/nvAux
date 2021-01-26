/**
 * NxOmnibar - The nvAux Omnibar
 * A single input to simultaneously search or create a note.
 * More: https://github.com/matterofabstract/nvAux/wiki/NxOmnibar
 *
 * 1. Type something, nvAux will keep it in state as omniText
 * 2. ...
 * 3. ...
 */

import React from 'react';
import { useObserver } from 'mobx-react';

import { NxIcon } from './NxIcon';
import { StoreContext } from '../store';

export const NxOmnibar = () => {
  const store = React.useContext(StoreContext);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('focus on best match or create new...');
    }
  }

  return useObserver(() => (
    <div className="omnibar">
      <NxIcon name="search" />
      <input
        type="text"
        placeholder="Search or Create"
        value={store.omniText}
        onChange={(e) => store.setOmniText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  ));
};

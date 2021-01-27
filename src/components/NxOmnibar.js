/**
 * NxOmnibar - The nvAux Omnibar
 * A single input to simultaneously search or create a note.
 * More: https://github.com/matterofabstract/nvAux/wiki/NxOmnibar
 *
 */

import React, { useEffect, useRef } from 'react';
import { Observer } from 'mobx-react';

import { NxIcon } from './NxIcon';
import { StoreContext } from '../store';

export const NxOmnibar = () => {
  const store = React.useContext(StoreContext);
  const inputEl = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('focus on best match or create new...');
    }
  }

  useEffect(() => {
    /**
     * TODO: autocompletion fill-in text selection
     *
     * You need to first select the field entirely
     *   inputEl.current.select();
     *
     * Then make your selection with a range (and direction):
     *   inputEl.current.setSelectionRange(3, 6, "backward");
     *
     * to get the current position of key cursor:
     *   inputEl.current.selectionStart
     *
     */
  }, []);

  return (
    <Observer>{() => (
      <div className="omnibar">
        <NxIcon name="search" />
        <input
          type="text"
          placeholder="Search or Create"
          value={store.omniText}
          ref={inputEl}
          onChange={(e) => store.setOmniText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    )}</Observer>
  );
};

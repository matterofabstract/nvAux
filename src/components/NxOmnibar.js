/**
 * NxOmnibar - The nvAux Omnibar
 * A single input to simultaneously search or create a note.
 * More: https://github.com/matterofabstract/nvAux/wiki/NxOmnibar
 *
 */

import React, { useRef } from 'react';
import { Observer } from 'mobx-react';
import { useRxData, useRxCollection} from 'rxdb-hooks';
import { v4 as uuidv4 } from 'uuid';

import { NxIcon } from './NxIcon';
import { StoreContext } from '../store';

export const NxOmnibar = () => {
  const store = React.useContext(StoreContext);
  const inputEl = useRef(null);

  const notesCollection = useRxCollection('notes');

  // useEffect(() => {
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
  // }, []);

  const queryConstructor = collection =>
    collection
      .find();

  const { result: notes, isFetching } = useRxData(
    'notes',
    queryConstructor
  );

  if (isFetching) {
    return 'loading characters...';
  }


  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      // Create Note using e.target.value
      console.log('notes @@@@@@@@@@', notes);
      notesCollection.insert({
        name: e.target.value,
        guid: uuidv4(),
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString()
      })
    }
  }

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

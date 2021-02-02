import React from 'react';
import { useRxData } from 'rxdb-hooks';
import { ResizableBox } from 'react-resizable';
import { formatRelative } from 'date-fns'
import { Observer } from "mobx-react";

import { NxNoteTypeIcon } from './NxNoteTypeIcon';
import { useWindowSize } from '../hooks';
import { StoreContext } from '../store';

export const NxFileList = () => {
  const store = React.useContext(StoreContext);
  const size = useWindowSize();

  const queryConstructor = collection =>
    collection
      .find()
      // .where('type')
      // .equals('soundcloud');

  const { result: notes, isFetching } = useRxData('notes', queryConstructor);

  if (isFetching) {
    return 'loading notes...';
  }

  return (
    <ResizableBox width={size.width} height={notes ? 200 : 100} axis={'y'}>
      <div className="file-list">

        <Observer>{() => (

          notes ? (
            <ul>
              {notes
                .sort((a, b) => a.updatedAt - b.updatedAt)
                .reverse()
                .map(({ guid, name, body, type, updatedAt }) => {
                  const updatedAtRelative = formatRelative(new Date(updatedAt * 1), new Date())
                  return (
                  <li
                    key={guid} onMouseDown={() => store.setGuidInFocus(guid)}
                    className={`${guid === store.guidInFocus && 'active'}`}
                  >
                    <div className="flex-grow-1 whitespace-no-wrap truncate">
                      <span><NxNoteTypeIcon name={type} /></span>
                      <span className="font-lato">{name}</span>
                      <span className="separator">—</span>
                      <span className="file-preview flex-grow-1 border-box font-operator-mono">{body}</span>
                    </div>

                    <div>
                      <span className="truncate font-operator-mono px-1" style={{ color: '#5a5a5a' }}>
                        {updatedAtRelative}
                      </span>
                    </div>
                  </li>
                  )
                  })}
            </ul>
          ) : <div className="nothing-selected">create something to get started.</div>


        )}</Observer>

      </div>
    </ResizableBox>
  );
};

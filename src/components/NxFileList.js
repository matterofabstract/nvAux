import React, { useState, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';
import { ResizableBox } from 'react-resizable';
import { formatRelative } from 'date-fns'


import { NxNoteTypeIcon } from './NxNoteTypeIcon';
import { useWindowSize } from '../hooks';

export const NxFileList = () => {
  const [activeFileId, setActiveFileId] = useState();
  const [fileList, setFileList] = useState();
  const size = useWindowSize();

  const queryConstructor = collection =>
    collection
      .find()
      // .where('type')
      // .equals('soundcloud');

  const { result: notes, isFetching } = useRxData(
    'notes',
    queryConstructor
  );

  useEffect(() => {
    setFileList(notes)
  }, [notes])

  if (isFetching) {
    return 'loading notes...';
  }

  return (
    <ResizableBox width={size.width} height={fileList ? 200 : 100} axis={'y'}>
      <div className="file-list">

        {fileList ? (
          <ul>
            {fileList
              .sort((a, b) => a.updatedAt - b.updatedAt)
              .reverse()
              .map(({ guid, name, body, type, updatedAt }) => {
                const updatedAtRelative = formatRelative(new Date(updatedAt * 1), new Date())
                return (
                <li
                  key={guid} onMouseDown={() => setActiveFileId(guid)}
                  className={`${guid === activeFileId && 'active'}`}
                >
                  <div className="flex-grow-1 whitespace-no-wrap truncate">
                    <span><NxNoteTypeIcon name={type} /></span>
                    <span className="font-lato">{name}</span>
                    <span className="separator">—</span>
                    <span className="file-preview flex-grow-1 border-box font-operator-mono">this is some sort of long preview that will show off our sweet ellipsis effect on the body preview that is actually the full-lenth body copy but whatever. It's a feature, rigth?{body}</span>
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
        }
      </div>
    </ResizableBox>
  );
};

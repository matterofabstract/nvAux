import React, { useState, useEffect } from 'react';
import { useRxData } from 'rxdb-hooks';

import { IconContext } from 'react-icons';
import { FaBookmark, FaSoundcloud } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { ResizableBox } from 'react-resizable';

import { useWindowSize } from '../hooks';


function getTypeColor(type) {
  return {
    url: '#32808e',
    soundcloud: '#ffa502',
    python: 'yellow',
    javascript: '#eed819'
  }[type];
}

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

        { fileList ? (<ul>
          {fileList.map(({ guid, name, preview, type }) => (
            <li key={guid} onClick={() => setActiveFileId(guid)} className={`${guid === activeFileId && 'active'}`}>
              <div style={{ width: 25, display: 'inline-block' }}>
                <IconContext.Provider
                  value={{
                    color: getTypeColor(type),
                    className: 'file-type-symbol'
                  }}
                >
                  {type === 'url' && <FaBookmark />}
                  {type === 'soundcloud' && <FaSoundcloud />}
                  {type === 'javascript' && <IoLogoJavascript />}
                </IconContext.Provider>
              </div>
              <span className="file-name">{name}</span>
              <span className="separator">—</span>
              <span className="file-preview">{preview}</span>
            </li>
          ))}
        </ul>)
        : <div className="nothing-selected">create something to get started.</div>
        }
      </div>
    </ResizableBox>
  );
};

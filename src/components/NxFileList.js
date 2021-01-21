import React, { useState } from 'react';
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
  const [fileList] = useState();
  const size = useWindowSize();

  const queryConstructor = collection =>
    collection
      .find()
      .where('type')
      .equals('soundcloud');

  const { result: notes, isFetching } = useRxData(
    'notes',
    queryConstructor
  );

  // useEffect(() => {
  //   ipcRenderer.on('search-notes-containing-reply', (event, arg) => {
  //     console.log('NxFileList heard "search-notes-containing-reply"', event)
  //     setFileList(arg);
  //   })
  // }, [])

  if (isFetching) {
    return 'loading notes...';
  }


  return (
    <ResizableBox width={size.width} height={fileList ? 200 : 100} axis={'y'}>
      <div className="file-list">

        <ul>
          {notes.map((note, idx) => (
            <li key={idx}>{note.name}</li>
          ))}
        </ul>

        { fileList ? (<ul>
          {fileList.map(({ id, name, preview, type }) => (
            <li key={id} onClick={() => setActiveFileId(id)} className={`${id === activeFileId && 'active'}`}>
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

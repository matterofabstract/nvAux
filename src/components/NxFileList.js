import React, { useRef } from 'react';
import { useRxData } from 'rxdb-hooks';
import { ResizableBox } from 'react-resizable';
import { formatRelative } from 'date-fns'
import { Observer } from "mobx-react";

import { NxIcon } from './micro/NxIcon';
import { useWindowSize, useContextMenu } from '../hooks';
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

  const handleEnterOnNote = (noteGuid) => {
    console.log('handleEnterOnNote called')
    if (noteGuid === store.guidInFocus) {
      console.log('this is the active note')
    }
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
                .map((note) => {
                  const updatedAtRelative = formatRelative(new Date(note.updatedAt * 1), new Date())
                  return (
                    <NxFileListItem
                      key={note.guid}
                      updatedAtRelative={updatedAtRelative}
                      handleEnterOnNote={handleEnterOnNote}
                      store={store}
                      note={note}
                    />
                  )
                })
              }
            </ul>
          ) : <div className="nothing-selected">create something to get started.</div>
        )}</Observer>
      </div>
    </ResizableBox>
  );
};


const NxFileListItem = (props) => {
  const { guid, type, name, body } = props.note;
  const { store, updatedAtRelative, handleEnterOnNote } = props;
  const elementRef = useRef(null);

  return (
    <li
      onMouseDown={() => store.setGuidInFocus(guid)}
      onKeyDown={() => handleEnterOnNote(guid)}
      className={`${guid === store.guidInFocus && 'active'}`}
      ref={elementRef}
    >
      <Menu outerRef={elementRef}/>
      <div className="flex-grow-1 whitespace-no-wrap truncate">
        <span>
          <div style={{ width: 25, display: 'inline-block' }}>
            <NxIcon name={type} />
          </div>
        </span>
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
}

const Menu = ({ outerRef }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);

  if (menu) {
    return (
      <ul className="context-menu font-lato" style={{ top: yPos, left: xPos }}>
        <li>Rename</li>
        <li>Tag</li>
        <li><NxIcon name="delete" /> Delete Note</li>
        <li className="break"/>
        <li>Copy URL...</li>
        <li>Export</li>
        <li>Show in Finder</li>
        <li>Edit with...</li>
        <li className="break"/>
        <li>Print...</li>
      </ul>
    );
  }
  return <></>;
};

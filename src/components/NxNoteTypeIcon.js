import React from 'react';
import { IconContext } from 'react-icons';
import { FaBookmark, FaSoundcloud } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';

function getTypeColor(name) {
  return {
    url: '#32808e',
    soundcloud: '#ffa502',
    python: 'yellow',
    javascript: '#eed819'
  }[name];
}

// TODO: utilize NxIcon

export const NxNoteTypeIcon = ({ name="url" }) => {
  return (
    <div style={{ width: 25, display: 'inline-block' }}>
      <IconContext.Provider
        value={{
          color: getTypeColor(name),
          className: 'file-type-symbol'
        }}
      >
        {name === 'url' && <FaBookmark />}
        {name === 'soundcloud' && <FaSoundcloud />}
        {name === 'javascript' && <IoLogoJavascript />}
      </IconContext.Provider>
    </div>
  );
}

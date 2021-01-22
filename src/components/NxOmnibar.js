/**
 * nvAux Omnibar - Search
 */

import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';

const searchNotesContaining = (searchString) => {
  // ipcRenderer.send('search-notes-containing', searchString);
};

export const NxOmnibar = () => {
  const [omniText, setOmniText] = useState('');

  // useEffect(() => {
  //   ipcRenderer.on('search-notes-containing-reply', (event, arg) => {
  //     console.log('message @@@@@@@@@@', arg);
  //   })
  // }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchNotesContaining(omniText)
    }
  }

  return (
    <div className="omnibar">
      <IconContext.Provider value={{ className: 'icon-search' }}>
        <FaSearch />
      </IconContext.Provider>

      <input
        type="text"
        placeholder="Search or Create"
        value={omniText}
        onChange={(e) => setOmniText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

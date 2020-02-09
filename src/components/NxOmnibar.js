import React from 'react';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';

export const NxOmnibar = () => {
  return (
    <div className="omnibar">
      <IconContext.Provider value={{ className: 'icon-search' }}>
        <FaSearch />
      </IconContext.Provider>
      <input type="text" placeholder="Search or Create" />
    </div>
  );
};

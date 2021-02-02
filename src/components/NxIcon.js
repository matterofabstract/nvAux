import React from 'react';
import { IconContext } from 'react-icons';
import { FaSearch } from 'react-icons/fa';

export const NxIcon = ({ name }) => {
  return (
    <IconContext.Provider value={{ className: 'icon-search' }}>
      <FaSearch />
    </IconContext.Provider>
  );
}

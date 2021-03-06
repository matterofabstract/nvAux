import React from 'react';
import { FaTimes } from 'react-icons/fa';

export const NxCloseButton = () => {

  const closeWindow = () => {
    window.ipcRenderer.send('hide_app');
  }

  return (
    <button className="close-window" onClick={closeWindow}>
      <FaTimes />
    </button>
  );
};

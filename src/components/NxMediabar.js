import React from 'react';
import { FaBackward, FaPlay, FaForward } from 'react-icons/fa';

export const NxMediabar = () => {
  return (
    <div className="mediabar">
      <div className="mediabar-controls">
        <FaBackward className="fa-backward" />
        <FaPlay className="fa-play" />
        <FaForward className="fa-forward" />
      </div>
    </div>
  );
};

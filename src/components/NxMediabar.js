import React from 'react';
import { FaBackward, FaPlay, FaForward } from 'react-icons/fa';

export const NxMediabar = () => {
  const handleBackwardBtn = () => {
    console.log('<< backward button clicked.')
  }
  const handlePlayPauseBtn = () => {
    console.log('play button clicked.')
  }
  const handleForwardBtn = () => {
    console.log('>> foreward button clicked.')
  }
  return (
    <div className="mediabar">
      <div className="mediabar-controls">
        <button onClick={handleBackwardBtn}>
        <FaBackward className="fa-backward" />
        </button>
        <button onClick={handlePlayPauseBtn}>
        <FaPlay className="fa-play" />
        </button>
        <button onClick={handleForwardBtn}>
        <FaForward className="fa-forward" />
        </button>
      </div>
      <div className="display">
        <div>
          Nothing Playing
        </div>
      </div>
    </div>
  );
};

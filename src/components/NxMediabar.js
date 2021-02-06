import React from 'react';
import { FaBackward, FaPlay, FaForward } from 'react-icons/fa';

import { NxRotaryKnob } from './NxRotaryKnob';

export const NxMediabar = () => {
  // const [value, setValue] = useState(0);
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
        <div className="" style={{ padding: '0 4px' }}>
          <NxRotaryKnob />
          {/* <div style={{ position: 'relative', top: -3,  backgroundImage: `url(${imgKnob})`, backgroundSize: 'contain', width: 33, height: 28, }} /> */}
        </div>
      <div className="display">
        <div>
          {/* Noisia - The Hole Pt1 */}
        </div>
      </div>
    </div>
  );
};

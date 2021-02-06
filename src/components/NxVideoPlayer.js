import React from 'react';
import { Observer } from 'mobx-react';
import AnimateHeight from 'react-animate-height';

import { StoreContext } from '../store';

import imgSplash from '../media/images/viz-splash.jpg';

export const NxVideoPlayer = () => {
  const store = React.useContext(StoreContext);
  return (
    <Observer>
      {() => (
        <AnimateHeight
          duration={ 500 }
          easing="ease-in-out"
          height={ store.showVideoPlayer ? 'auto' : 0 } // see props documentation below
          animateOpacity
        >
        <div className="video-player" style={{ margin: 'auto', textAlign: 'center' }}>
          <img src={imgSplash} alt="" style={{ width: 'calc(100% - 20px)', margin: '6px auto 3px auto', borderRadius: 6 }}/>
        </div>
        </AnimateHeight>
      )}
    </Observer>
  );
}

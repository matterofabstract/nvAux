import { useState, useEffect } from 'react';

const isClient = typeof window === 'object';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: isClient ? window.innerWidth : Infinity,
    height: isClient ? window.innerHeight : Infinity
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  });

  return windowSize;
};

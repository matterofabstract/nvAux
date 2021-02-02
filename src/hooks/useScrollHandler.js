/**
 * Currently unused but the thought here is we can tuck away the NxFileList,
 * etc on certain scrolling patterns.
 */

import { useState, useEffect } from 'react';

export const useScrollHandler = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 300;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    };

    document.addEventListener('scroll', onScroll);

    // on unmount
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [scroll, setScroll]);

  return scroll;
};

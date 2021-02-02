import { useEffect } from 'react';

import { useWindowSize, useDebounce } from '../hooks';

export const useSaveWindowDimensions = () => {
  const size = useWindowSize();
  const windowDimensions = useDebounce(size, 500)
  useEffect(() => {
    window.ipcRenderer.send('save_window_dimensions', windowDimensions);
  }, [windowDimensions])
};




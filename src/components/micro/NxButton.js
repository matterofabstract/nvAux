import React from 'react';

import { NxIcon } from './NxIcon';

export const NxButton = ({ icon, handler, isActive, classes }) => {
  return (
    <button onClick={handler} className={classes}>
      <NxIcon name={icon} isActive={isActive} />
    </button>
  );
}

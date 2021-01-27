import React from 'react';

import { createMarkup } from '../utils';

const NothingSelected = () => <div className="nothing-selected">create something to get started.</div>;

export const NxFileContent = ({ data }) => {
  return (
    <div className="file-content">
      {data ? <div dangerouslySetInnerHTML={createMarkup(data)} /> : <NothingSelected />}
    </div>
  );
};

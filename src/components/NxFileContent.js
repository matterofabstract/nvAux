import React from 'react';
import { useRxDocument } from 'rxdb-hooks';

import { NxFileContentEditor } from './NxFileContentEditor';

const NothingSelected = () => <div className="nothing-selected">create something to get started.</div>;

export const NxFileContent = ({ guidInFocus }) => {
  const { result: note, isFetching } = useRxDocument('notes', guidInFocus, {
    idAttribute: 'guid',
  });

  if (isFetching) {
    return <NothingSelected />
  }

  return (
    <div className="file-content">
      <NxFileContentEditor note={note} />
    </div>
  );
};

import React from 'react';
import { useRxDocument } from 'rxdb-hooks';
import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";

const NothingSelected = () => <div className="nothing-selected">create something to get started.</div>;

export const NxFileContent = ({ guidInFocus }) => {
  const { result: note, isFetching } = useRxDocument('notes', guidInFocus, {
    idAttribute: 'guid',
  });

  if (isFetching) {
    return <NothingSelected />
  }

  const handleBody = async (newValue) => {
    await note.update({
      // $inc: {
      //     age: 1 // increases age by 1
      // },
      $set: {
          body: newValue
      }
  });
  }

  return (
    <div className="file-content">
      <AceEditor
        placeholder="type something..."
        // mode="java"
        theme="twilight"
        onChange={handleBody}
        name="UNIQUE_ID_OF_DIV"
        value={note.body}
        width="100%"
        showGutter={false}
        showPrintMargin={false}
        // editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

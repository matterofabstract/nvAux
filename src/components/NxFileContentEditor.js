import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-mediawiki";
import "ace-builds/src-noconflict/theme-twilight";

export const NxFileContentEditor = ({ note }) => {
  const [bodyBodyBuffer, setNoteBodyBugger] = useState()

  useEffect(() => {
    setNoteBodyBugger(note.body)
  }, [note.body]);

  const handleBody = async (newValue) => {
   setNoteBodyBugger(newValue);
    // await note.update({
    //   // $inc: {
    //   //     age: 1 // increases age by 1
    //   // },
    //   $set: {
    //       body: newValue
    //   }
  //});
  }

  return (
    <div className="file-content">
      <AceEditor
        placeholder="type something..."
        mode="mediawiki"
        theme="twilight"
        onChange={handleBody}
        name="UNIQUE_ID_OF_DIV"
        value={bodyBodyBuffer}
        width="100%"
        showGutter={false}
        showPrintMargin={false}
        // editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

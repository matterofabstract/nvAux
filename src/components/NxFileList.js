import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { FaBookmark, FaSoundcloud } from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io';
import { ResizableBox } from 'react-resizable';

import { useWindowSize } from '../hooks';

const demoFileList = [
  {
    id: 1,
    name: 'Research / Learn',
    preview: '# Django [] http://django-vanilla-views.org/ [] http…',
    type: 'markdown'
  },
  {
    id: 2,
    name: 'Empty by Baribal',
    preview: 'https://soundcloud.com/thatdudebrb/sets/empty',
    type: 'soundcloud'
  },
  {
    id: 3,
    name: 'Google Analytics - Goal Conversion Notes',
    preview: 'If you’re tracking an actual tr…',
    type: 'text'
  },
  {
    id: 4,
    name: 'express-server.mjs',
    preview: "import express from 'express'; import path from 'p…",
    type: 'javascript'
  },
  {
    id: 5,
    name: 'Dell RMA',
    preview: 'Dell U-Series 38" Screen LED-Lit Monitor (U3818DW)',
    type: 'text'
  },
  {
    id: 6,
    name: 'JavaScript - Canon Camera Preview via gphoto2 - Third Attempt',
    preview: 'const express = require(express)',
    type: 'text'
  },
  {
    id: 7,
    name: 'HOW TO git merge',
    preview: '# Django [] http://django-vanilla-views.org/ [] http…',
    type: 'markdown'
  },
  {
    id: 8,
    name: 'FHOBOS - Motion Picture v2',
    preview: 'https://soundcloud.com/thatdudebrb/sets/empty',
    type: 'soundcloud'
  },
  {
    id: 9,
    name: 'Google Analytics - Goal Conversion Notes',
    preview: 'If you’re tracking an actual tr…',
    type: 'text'
  },
  {
    id: 10,
    name: 'express-server.mjs',
    preview: "import express from 'express'; import path from 'p…",
    type: 'javascript'
  },
  {
    id: 11,
    name: 'Evvy’s Skate Party',
    preview: 'https://www.traxsideskating.com/wp/product-category…',
    type: 'url'
  },
  {
    id: 12,
    name: 'A quick GraphQL server via express',
    preview: 'server.mjs (the `m` in `mjs` is requi…',
    type: 'text'
  }
];

function getTypeColor(type) {
  return {
    url: '#32808e',
    soundcloud: '#ffa502',
    python: 'yellow',
    javascript: '#eed819'
  }[type];
}

export const NxFileList = ({ fileList = demoFileList }) => {
  const [activeFileId, setActiveFileId] = useState();
  const size = useWindowSize();

  return (
    <ResizableBox width={size.width} height={200} axis={'y'}>
      <div className="file-list">
        <ul>
          {fileList.map(({ id, name, preview, type }) => (
            <li key={id} onClick={() => setActiveFileId(id)} className={`${id === activeFileId && 'active'}`}>
              <div style={{ width: 25, display: 'inline-block' }}>
                <IconContext.Provider
                  value={{
                    color: getTypeColor(type),
                    className: 'file-type-symbol'
                  }}
                >
                  {type === 'url' && <FaBookmark />}
                  {type === 'soundcloud' && <FaSoundcloud />}
                  {type === 'javascript' && <IoLogoJavascript />}
                </IconContext.Provider>
              </div>
              <span className="file-name">{name}</span>
              <span className="separator">—</span>
              <span className="file-preview">{preview}</span>
            </li>
          ))}
        </ul>
      </div>
    </ResizableBox>
  );
};

/**
 * The ipcMain module is an Event Emitter. When used in the main process, it
 * handles asynchronous and synchronous messages sent from a renderer process
 * (web page). Messages sent from a renderer will be emitted to this module.
 */

const { app, ipcMain } = require('electron');


ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('hide_app', (event) => {
  app.hide();
});

ipcMain.on('search-notes-containing', (event, arg) => {
  console.log('ipcMain heard "search-notes-containing" with: ', arg);
  console.log('~~~~~~~~~~~~ ', global)

  // global.db.notes.insert({
  //   name: `arg`,
  //   type: 'soundcloud',
  //   body: 'content goes here'
  // });

  event.sender.send('search-notes-containing-reply', [
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
  ]);
})

import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { schema } from './schema';

/**
 * State that persists to localStorage =========================================
 */

const storedNoteListHeight = localStorage.getItem('noteListHeight') || 220;
const storedFullScreen = JSON.parse(localStorage.getItem('fullScreen')) || false;
const storedMaximumFullScreen = JSON.parse(localStorage.getItem('maximumFullScreen')) || true;
const storedShowClock = JSON.parse(localStorage.getItem('showClock')) || "true";

/**
 * RxDB ************************************************************************
 */

addRxPlugin(RxDBDevModePlugin);

let dbPromise;

const _create = async () => {
  const db = await createRxDatabase({
    name: 'nvauxdb',
    storage: getRxStorageDexie(),
    ignoreDuplicate: true
  });

  await db.addCollections({ notes: { schema } });

  const notes = await db.notes.find().exec();

  let welcomeNote = await db.notes.findOne('11111111-1111-1111-1111-111111111111').exec();

  setTimeout(() => {
    if (notes.length === 0 && !welcomeNote) {
      db.notes.insert({
        guid: '11111111-1111-1111-1111-111111111111',
        name: '🚀 Welcome to nvAux!',
        body: `Welcome and thank you for using nvAux!

This is a web-based note-taking app inspired by nvALT where searching and creating notes is one in the same action. A few things to keep in-mind:

* All your notes are stored within your browser, locally (and unencrypted for now).
* Do no trust your data here yet. Not production-ready. Thar be dragons.
* 'Add to Home Screen' on iOS Safari for a native app-like experience.

If you are interested in the development of nvAux the project is open-source and available on GitHub at https://github.com/matterofabstract/nvaux

You can download your notes at any time by clicking the 'Download Notes' button in the nvAux settings screen.

Don't forget to follow the project on 𝕏 at @nvAuxApp and let us know what you think!
  `,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
    };
  }, 100);

  // Always make sure the Settings Note exists
  let settingsNote = await db.notes.findOne('00000000-0000-0000-0000-000000000000').exec();

  if (!settingsNote) {
    await db.notes.insert({
      guid: '00000000-0000-0000-0000-000000000000',
      name: '⚙️ nvAux Settings',
      body: 'Adjust Your nvAux Preferences',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
    // await db.notes.insert({
    //   guid: '00000000-0000-0000-0000-111111111111',
    //   name: 'Sketch Pad Demo',
    //   body: 'Use this demo note to test out the sketch pad feature.',
    //   createdAt: new Date().getTime(),
    //   updatedAt: new Date().getTime()
    // });
  };


  dbPromise = db;
  return db;
};

export const db = () => dbPromise ? dbPromise : _create();

/**
 * Svelte Writables ************************************************************
 */

export const omniMode = writable('search');
export const omniText = writable('');
export const noteList = writable([]);
export const noteListHeight = writable(storedNoteListHeight);
export const selectedNote = writable({});
export const bodyText = writable('');
export const fullScreen = writable(storedFullScreen);
export const maximumFullScreen = writable(storedMaximumFullScreen);
export const showClock = writable(storedShowClock);


omniText.subscribe(v => {
  if (v === '') {
    omniMode.set('search');
    selectedNote.set('')
    // TODO: scroll to top of NoteList
  }
});

noteListHeight.subscribe(v => localStorage.setItem('noteListHeight', v.toString()));

fullScreen.subscribe(v => localStorage.setItem('fullScreen', v));
maximumFullScreen.subscribe(v => localStorage.setItem('maximumFullScreen', v));
showClock.subscribe(v => localStorage.setItem('showClock', v));

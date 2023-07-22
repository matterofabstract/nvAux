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
        body: `Welcome and thank you for taking interest in nvAux!

This is a web-based note-taking app inspired by nvALT. A few important things to note:

* All your notes are stored locally in your browser.
* Expect bugs, dead-ends, and missing features as it's still early in development.
* Do no trust your data here yet. Testing purposes only.
* 'Add to Home Screen' to feel more app-like.
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
      body: 'Set your nvAux Preferences here',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
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

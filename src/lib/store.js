import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { schema } from './schema';

/**
 * State that persists to localStorage =========================================
 */

const storedNoteListHeight = localStorage.getItem('noteListHeight') || 100;

/**
 * RxDB ************************************************************************
 */

addRxPlugin(RxDBDevModePlugin);

let dbPromise;

const _create = async () => {
  const db = await createRxDatabase({
    name: 'nvauxdb',
    storage: getRxStorageDexie(),
    // ignoreDuplicate: true
  });

  await db.addCollections({ notes: { schema } });

//   const date = new Date().getTime();
//   if (db.notes) {
//     await db.notes.insert({
//       guid: uuidv4(),
//       name: '🚀 Welcome to nvAux!',
//       body: `
// Welcome aboard! nvAux is your new personal command center, designed to capture your thoughts and ideas swiftly and securely. Inspired by the principles of OmniFocus and David Allen's 'Getting Things Done', nvAux is more than just a note-taking app—it's a productivity powerhouse.

// Here's a quick rundown of what you can do with nvAux:

// Omni-Modal Input: Type or draw your thoughts into existence.
// Offline-First: Your notes are always available, online or offline.
// Encrypted Data: Your privacy is our priority. All your notes are encrypted.
// Single HTML File: Carry nvAux in your pocket, on any device.
// Dark/Light Theme: Work in the environment you prefer.
// Dive into our User Guide to explore these features in detail, or check out our FAQs if you have any questions. Happy note-taking!

// The nvAux Team
//   `,
//       createdAt: date,
//       updatedAt: date
//     });
//   };

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

omniText.subscribe(v => {
  if (v === '') {
    omniMode.set('search');
    selectedNote.set('')
    // TODO: scroll to top of NoteList
  }
});

noteListHeight.subscribe(v => localStorage.setItem('noteListHeight', v.toString()));

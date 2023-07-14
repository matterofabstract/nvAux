import { writable } from 'svelte/store';

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
    ignoreDuplicate: true
  });
  await db.addCollections({ notes: { schema } });
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

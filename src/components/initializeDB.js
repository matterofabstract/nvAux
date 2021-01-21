import { addRxPlugin, createRxDatabase } from 'rxdb';
import idb from 'pouchdb-adapter-idb'

addRxPlugin(idb);

const noteSchema = {
  title: 'note',
  description: 'an individual note',
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    type: {
      type: 'string'
    },
    body: {
      type: 'string'
    }
  },
  required: ['name']
};

export const initializeDB = async () => {
  const db = await createRxDatabase({
    name: 'nvauxdb',
    adapter: 'idb',
  });

  // add a collection to our db
  const collections = await db.addCollections({
    notes: {
      schema: noteSchema
    }
  });

  collections.notes.insert({
    name: 'foooobar',
    type: 'soundcloud',
    body: 'readme'
  });


  // maybe sync collection to a remote
  // ...

  return db;
};

import { addRxPlugin, createRxDatabase } from 'rxdb';
import idb from 'pouchdb-adapter-idb'

addRxPlugin(idb);

const noteSchema = {
  title: 'note',
  description: 'an individual note',
  version: 0,
  type: 'object',
  properties: {
    guid: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string',
    },
    type: {
      type: 'string'
    },
    body: {
      type: 'string'
    },
    createdAt: {
      type: "string"
    },
    updatedAt: {
      type: "string"
    },
  },
  required: ['name']
};

export const initializeDB = async () => {
  const db = await createRxDatabase({
    name: 'nvauxdb',
    adapter: 'idb',
  });

  await db.addCollections({
    notes: {
      schema: noteSchema,
      autoMigrate: true
    }
  });

  return db;
};

const { createRxDatabase } = require('rxdb');

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

let _getDatabase; // cached
const getDatabase = (name, adapter) => {
  if (!_getDatabase) _getDatabase = createDatabase(name, adapter);
  return _getDatabase;
}

const createDatabase = async (name, adapter) => {
  let db = await createRxDatabase({
      name,
      adapter,
      password: 'myLongAndStupidPassword'
  });

  await db.addCollections({
      name: 'notes',
      schema: noteSchema
  });

  console.log('addCollections Notes: ', )

  return db;
}
module.exports = {
  getDatabase
};

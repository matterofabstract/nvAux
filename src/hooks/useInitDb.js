import { useState, useEffect } from 'react';

import { initializeDB } from '../db';

export const useInitDb = () => {
  const [db, setDb] = useState();

  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDB();
      setDb(_db);
    };
    initDB();
  }, []);

  return db;
};

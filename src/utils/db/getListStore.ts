import openDatabase from './openDatabase';

type Permission = 'readwrite' | 'readonly';

export const getListStore = async (permission: Permission) => {
  const db = await openDatabase();
  const transaction = db.transaction(['todoList'], permission);
  const listStore = transaction.objectStore('todoList');

  return listStore;
};

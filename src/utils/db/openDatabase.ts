const openDatabase = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('TODO', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      if (!event.target) return;
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('todoList')) {
        const listStore = db.createObjectStore('todoList', {
          autoIncrement: true,
        });
        listStore.createIndex('id', 'date', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to open database');
  });
};

export default openDatabase;

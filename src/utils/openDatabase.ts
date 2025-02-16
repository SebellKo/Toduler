const initialData = [
  {
    id: 'schedules',
    title: 'Schedules',
    type: 'schedule',
    required: true,
    contents: [],
  },
  {
    id: 'todos',
    title: 'ToDos',
    type: 'todo',
    required: true,
    contents: [],
  },
];

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

        for (const item of initialData) {
          listStore.add(item);
        }

        // listStore.createIndex('name', 'name', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to open database');
  });
};

export default openDatabase;

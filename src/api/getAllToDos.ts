import { ListData } from '../types/listData';
import { getListStore } from '../utils/db/getListStore';

export const getAllToDos = async (date: string): Promise<ListData[]> => {
  try {
    const listStore = await getListStore('readonly');
    const getRequest = listStore.getAll();

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        const result: ListData[] = (event.target as IDBRequest).result;

        if (!result) resolve([]);

        const filteredResult = result.filter(
          (item) => item.date.slice(0, 7) === date
        );

        resolve(filteredResult);
      };
      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
};

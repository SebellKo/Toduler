import { ContentData } from '../../types/listData';
import { getListStore } from '../../utils/db/getListStore';

interface Res {
  id: string;
  title: string;
  type: string;
  required: boolean;
  contents: ContentData[];
}

export const getTodoData = async (): Promise<Res[]> => {
  try {
    const listStore = await getListStore('readonly');

    return new Promise((resolve, reject) => {
      const getListRequest: IDBRequest = listStore.getAll();

      getListRequest.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result;
        resolve(result);
      };

      getListRequest.onerror = (error) => reject(error);
    });
  } catch (error) {
    throw error;
  }
};

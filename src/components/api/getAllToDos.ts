import { ContentData } from '../../types/listData';
import { getListStore } from '../../utils/db/getListStore';

interface Res {
  date: string;
  data: {
    id: string;
    title: string;
    type: string;
    required: boolean;
    contents: ContentData[];
  }[];
}

export const getAllToDos = async (): Promise<Res[]> => {
  try {
    const listStore = await getListStore('readonly');
    const getRequest = listStore.getAll();

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = (event) => {
        resolve((event.target as IDBRequest).result);
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

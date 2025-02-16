import { ContentData } from '../../types/listData';

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

export const getListById = async (
  date: string,
  nameIndex: IDBIndex
): Promise<Res> => {
  return new Promise((resolve, reject) => {
    const getCurrentListRequest = nameIndex.get(date);

    getCurrentListRequest.onsuccess = (event) => {
      if (!event.target) return;
      const result = (event.target as IDBRequest).result;
      resolve(result);
    };
    getCurrentListRequest.onerror = (error) => reject(error);
  });
};

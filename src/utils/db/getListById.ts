import { ContentData, SchduleContentData } from '../../types/listData';

interface Res {
  id: string;
  title: string;
  type: string;
  required: boolean;
  contents: ContentData[] | SchduleContentData[];
}

export const getListById = async (
  id: string,
  nameIndex: IDBIndex
): Promise<Res> => {
  return new Promise((resolve, reject) => {
    const getCurrentListRequest = nameIndex.get(id);

    getCurrentListRequest.onsuccess = (event) => {
      if (!event.target) return;
      const result = (event.target as IDBRequest).result;
      resolve(result);
    };
    getCurrentListRequest.onerror = (error) => reject(error);
  });
};

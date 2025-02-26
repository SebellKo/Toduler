import { ContentData } from '../types/listData';
import { createInitialList } from '../utils/createInitialList';
import { getListById } from '../utils/db/getListById';
import { getListStore } from '../utils/db/getListStore';

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

export const getTodoData = async (date: string): Promise<Res> => {
  try {
    const listStore = await getListStore('readonly');
    const nameIndex = listStore.index('id');

    const currentTodos = await getListById(date, nameIndex);

    if (!currentTodos) {
      const initialData = createInitialList(date);
      return initialData;
    }

    return currentTodos;
  } catch (error) {
    throw error;
  }
};

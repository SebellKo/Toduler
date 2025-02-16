import { ContentData } from '../../types/listData';
import { getListById } from '../../utils/db/getListById';
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

export const getTodoData = async (date: string): Promise<Res> => {
  try {
    const listStore = await getListStore('readonly');
    const nameIndex = listStore.index('id');

    const currentTodos = await getListById(date, nameIndex);

    if (!currentTodos) {
      const initialData = {
        date: date,
        data: [
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
        ],
      };
      return initialData;
    }
    console.log(currentTodos);
    return currentTodos;
  } catch (error) {
    throw error;
  }
};

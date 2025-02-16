import { v4 as uuidv4 } from 'uuid';
import { getListStore } from '../../utils/db/getListStore';
import { getListById } from '../../utils/db/getListById';
import getPrimaryKey from '../../utils/db/getPrimaryKey';

export const addTodoCategory = async (title: string, date: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const newCategory = {
      id: uuidv4(),
      type: 'todo',
      title: title,
      required: false,
      contents: [],
    };

    if (!currentList) {
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
          newCategory,
        ],
      };
      return await listStore.add(initialData);
    }

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const updatedList = {
      date: date,
      data: [...currentList.data, newCategory],
    };

    listStore.put(updatedList, primaryKey);
  } catch (error) {
    throw error;
  }
};

import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';
import { getListById } from '../utils/db/getListById';
import { v4 as uuidv4 } from 'uuid';

const addTodoListItem = async (
  id: string,
  date: string,
  content: string,
  time?: string
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const newContent = time
      ? {
          id: uuidv4(),
          done: false,
          content: content,
          time: time,
        }
      : {
          id: uuidv4(),
          done: false,
          content: content,
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
            contents: time ? [newContent] : [],
          },
          {
            id: 'todos',
            title: 'ToDos',
            type: 'todo',
            required: true,
            contents: time ? [] : [newContent],
          },
        ],
      };
      return await listStore.add(initialData);
    }

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const currentContentIndex = currentList.data.findIndex(
      (item) => item.id === id
    );

    currentList.data[currentContentIndex].contents = [
      ...currentList.data[currentContentIndex].contents,
      newContent,
    ];
    await listStore.put(currentList, primaryKey);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default addTodoListItem;

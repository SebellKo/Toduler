import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';
import { getListById } from '../utils/db/getListById';
import { v4 as uuidv4 } from 'uuid';
import { createInitialList } from '../utils/createInitialList';

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

    const newContent = {
      id: uuidv4(),
      done: false,
      content: content,
      ...(time && { time }),
    };

    if (!currentList) {
      const initialData = createInitialList(date);
      initialData.data.forEach((item) => {
        if (item.id === 'schedules') {
          item.contents = time ? [newContent] : [];
        } else if (item.id === 'todos') {
          item.contents = time ? [] : [newContent];
        }
      });

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

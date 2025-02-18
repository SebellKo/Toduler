import { getListById } from '../utils/db/getListById';
import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';
import { v4 as uuidv4 } from 'uuid';

const editTodoListItem = async (
  id: string,
  date: string,
  content: string,
  targetId: string,
  done: boolean
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const newContent = {
      id: uuidv4(),
      done: done,
      content: content,
    };

    const currentDataIndex = currentList.data.findIndex(
      (item) => item.id === id
    );

    const currentContent = currentList.data[currentDataIndex];
    const targetIndex = currentContent.contents.findIndex(
      (item) => item.id === targetId
    );

    currentList.data[currentDataIndex].contents[targetIndex] = newContent;

    await listStore.put(currentList, primaryKey);
  } catch (error) {
    throw error;
  }
};

export default editTodoListItem;

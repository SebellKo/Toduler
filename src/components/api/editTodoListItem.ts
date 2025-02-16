import { getListById } from '../../utils/db/getListById';
import { getListStore } from '../../utils/db/getListStore';
import getPrimaryKey from '../../utils/db/getPrimaryKey';
import { v4 as uuidv4 } from 'uuid';

const editTodoListItem = async (
  id: string,
  content: string,
  targetId: string,
  done: boolean
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(id, nameIndex);

    const primaryKey = await getPrimaryKey(id, nameIndex);

    const newContent = {
      id: uuidv4(),
      done: done,
      content: content,
    };

    const targetIndex = currentList.contents.findIndex(
      (commandItem) => commandItem.id === targetId
    );

    currentList.contents[targetIndex] = newContent;

    await listStore.put(currentList, primaryKey);
  } catch (error) {
    throw error;
  }
};

export default editTodoListItem;

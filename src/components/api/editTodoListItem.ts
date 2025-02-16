import { getListById } from '../../utils/db/getListById';
import { getListStore } from '../../utils/db/getListStore';
import getPrimaryKey from '../../utils/db/getPrimaryKey';
import { v4 as uuidv4 } from 'uuid';

const editTodoListItem = async (
  id: string,
  content: string,
  targetId: string
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('name');

    const currentList = await getListById(id, nameIndex);

    const primaryKey = await getPrimaryKey(id, nameIndex);

    const newContent = {
      id: uuidv4(),
      done: false,
      content: content,
    };

    const targetIndex = currentList.contents.findIndex(
      (commandItem) => commandItem.id === targetId
    );

    currentList.contents[targetIndex] = newContent;

    await listStore.put(currentList, primaryKey);
    return { isDuplicated: false };
  } catch (error) {
    console.log(error);
  }
};

export default editTodoListItem;

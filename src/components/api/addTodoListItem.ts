import { getListStore } from '../../utils/db/getListStore';
import getPrimaryKey from '../../utils/db/getPrimaryKey';
import { getListById } from './getListById';
import { v4 as uuidv4 } from 'uuid';

const addTodoListItem = async (id: string, content: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(id, nameIndex);

    const primaryKey = await getPrimaryKey(id, nameIndex);
    console.log(primaryKey);

    const newContent = {
      id: uuidv4(),
      done: false,
      content: content,
    };

    currentList.contents = [...currentList.contents, newContent];
    await listStore.put(currentList, primaryKey);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default addTodoListItem;

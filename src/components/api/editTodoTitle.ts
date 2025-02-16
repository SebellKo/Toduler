import { getListById } from '../../utils/db/getListById';
import { getListStore } from '../../utils/db/getListStore';
import getPrimaryKey from '../../utils/db/getPrimaryKey';

export const editTodoTitle = async (id: string, newTitle: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(id, nameIndex);

    const primaryKey = await getPrimaryKey(id, nameIndex);

    currentList.title = newTitle;

    await listStore.put(currentList, primaryKey);
  } catch (error) {
    throw error;
  }
};

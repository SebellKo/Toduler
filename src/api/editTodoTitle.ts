import { getListById } from '../utils/db/getListById';
import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';

export const editTodoTitle = async (
  id: string,
  date: string,
  newTitle: string
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const currentContentIndex = currentList.data.findIndex(
      (item) => item.id === id
    );

    currentList.data[currentContentIndex].title = newTitle;

    await listStore.put(currentList, primaryKey);
  } catch (error) {
    throw error;
  }
};

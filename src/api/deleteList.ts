import { getListById } from '../utils/db/getListById';
import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';

export const deleteList = async (id: string, date: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const updatedData = currentList.data.filter((item) => item.id !== id);

    currentList.data = updatedData;

    await listStore.put(currentList, primaryKey);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

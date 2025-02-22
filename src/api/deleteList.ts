import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';

export const deleteList = async (date: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const primaryKey = await getPrimaryKey(date, nameIndex);

    await listStore.delete(primaryKey);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

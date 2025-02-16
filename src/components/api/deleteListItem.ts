import { getListById } from '../../utils/db/getListById';
import { getListStore } from '../../utils/db/getListStore';
import getPrimaryKey from '../../utils/db/getPrimaryKey';

export const deleteListItem = async (id: string, targetId: string) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(id, nameIndex);

    const primaryKey = await getPrimaryKey(id, nameIndex);

    const updatedList = {
      ...currentList,
      contents: currentList.contents.filter((item) => item.id !== targetId),
    };

    await listStore.put(updatedList, primaryKey);
  } catch (error) {
    throw error;
  }
};

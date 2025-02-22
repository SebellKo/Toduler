import { getListById } from '../utils/db/getListById';
import { getListStore } from '../utils/db/getListStore';
import getPrimaryKey from '../utils/db/getPrimaryKey';

export const deleteListItem = async (
  id: string,
  date: string,
  targetId: string
) => {
  try {
    const listStore = await getListStore('readwrite');
    const nameIndex = listStore.index('id');

    const currentList = await getListById(date, nameIndex);

    const primaryKey = await getPrimaryKey(date, nameIndex);

    const currentDataIndex = currentList.data.findIndex(
      (item) => item.id === id
    );
    const currentContent = currentList.data[currentDataIndex];

    const updatedContent = currentContent.contents.filter(
      (item) => item.id !== targetId
    );

    const updatedData = [...currentList.data];
    updatedData[currentDataIndex] = {
      ...updatedData[currentDataIndex],
      contents: updatedContent,
    };

    const updatedList = {
      date: currentList.date,
      data: updatedData,
    };

    await listStore.put(updatedList, primaryKey);
  } catch (error) {
    throw error;
  }
};

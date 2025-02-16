import { v4 as uuidv4 } from 'uuid';
import { getListStore } from '../../utils/db/getListStore';

export const addTodoCategory = async (title: string) => {
  try {
    const listStore = await getListStore('readwrite');

    const newCategory = {
      id: uuidv4(),
      type: 'todo',
      title: title,
      required: false,
      contents: [],
    };

    listStore.add(newCategory);

    return { isDuplicated: false };
  } catch (error) {
    throw error;
  }
};

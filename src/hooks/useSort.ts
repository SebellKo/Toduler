import { ContentData } from '../types/listData';
import { timeToMinutes } from '../utils/timeToMinutes';

export const useSort = () => {
  const sortContents = (contents: ContentData[]) => {
    const sortedContents = contents.sort((a, b) => {
      return timeToMinutes(a.time!) - timeToMinutes(b.time!);
    });
    return sortedContents;
  };

  return { sortContents };
};

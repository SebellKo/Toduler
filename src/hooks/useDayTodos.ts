import { getTodoData } from '../api/getTodoData';
import { useDateStore } from '../stores/dateStore';
import { useQuery } from '@tanstack/react-query';
import { useSort } from './useSort';

export const useDayTodos = () => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { sortContents } = useSort();

  const { data: todoData } = useQuery({
    queryKey: ['todos', selectedDate],
    queryFn: () => getTodoData(selectedDate),
    select: (data) => {
      if (!data.data[0]) return data;
      data.data[0].contents = sortContents(data.data[0].contents);
      return data;
    },
  });

  return { todoData };
};

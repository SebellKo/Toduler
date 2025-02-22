import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllToDos } from '../api/getAllToDos';
import { useDateStore } from '../stores/dateStore';

export const useMonthTodos = () => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const filteredDate = selectedDate.slice(0, 7);

  const { data: todoData } = useSuspenseQuery({
    queryKey: ['todos', filteredDate],
    queryFn: () => getAllToDos(filteredDate),
  });

  return { todoData };
};

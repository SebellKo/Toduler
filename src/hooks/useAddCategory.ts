import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodoCategory } from '../api/addTodoCategory';
import { useDateStore } from '../stores/dateStore';

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const selectedDate = useDateStore((state) => state.selectedDate);

  const { mutate: addCategoryMutate } = useMutation({
    mutationFn: ({ title, date }: { title: string; date: string }) =>
      addTodoCategory(title, date),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', selectedDate] }),
  });

  return { addCategoryMutate };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodoCategory } from '../api/addTodoCategory';
import { useDateStore } from '../stores/dateStore';
import { deleteList } from '../api/deleteList';
import { editTodoTitle } from '../api/editTodoTitle';

export const useCategory = (
  selector?: (mutates: {
    addCategoryMutate: typeof addCategoryMutate;
    deleteCategoryMutate: typeof deleteCategoryMutate;
    editCategoryMutate: typeof editCategoryMutate;
  }) => any
) => {
  const queryClient = useQueryClient();
  const selectedDate = useDateStore((state) => state.selectedDate);

  const { mutate: addCategoryMutate } = useMutation({
    mutationFn: ({ title, date }: { title: string; date: string }) =>
      addTodoCategory(title, date),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', selectedDate] }),
  });

  const { mutate: deleteCategoryMutate } = useMutation({
    mutationFn: ({ id, date }: { id: string; date: string }) =>
      deleteList(id, date),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { mutate: editCategoryMutate } = useMutation({
    mutationFn: ({
      id,
      date,
      newTitle,
    }: {
      id: string;
      date: string;
      newTitle: string;
    }) => editTodoTitle(id, date, newTitle),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const mutates = {
    addCategoryMutate,
    deleteCategoryMutate,
    editCategoryMutate,
  };

  return selector ? selector(mutates) : mutates;
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editTodoTitle } from '../api/editTodoTitle';

export const useEditCategory = () => {
  const queryClient = useQueryClient();

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

  return { editCategoryMutate };
};

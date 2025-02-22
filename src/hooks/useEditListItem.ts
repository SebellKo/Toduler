import { useMutation, useQueryClient } from '@tanstack/react-query';
import editTodoListItem from '../api/editTodoListItem';

export const useEditListItem = () => {
  const queryClient = useQueryClient();

  const { mutate: editListItemMutate } = useMutation({
    mutationFn: ({
      id,
      date,
      content,
      targetId,
      done,
      time,
    }: {
      id: string;
      date: string;
      content: string;
      targetId: string;
      done: boolean;
      time?: string;
    }) => editTodoListItem(id, date, content, targetId, done, time),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return { editListItemMutate };
};

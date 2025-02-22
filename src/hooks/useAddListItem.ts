import { useQueryClient, useMutation } from '@tanstack/react-query';
import addTodoListItem from '../api/addTodoListItem';

export const useAddListItem = () => {
  const queryClient = useQueryClient();

  const { mutate: addListItemMutate } = useMutation({
    mutationFn: ({
      id,
      date,
      content,
      time,
    }: {
      id: string;
      date: string;
      content: string;
      time?: string;
    }) => addTodoListItem(id, date, content, time),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return { addListItemMutate };
};

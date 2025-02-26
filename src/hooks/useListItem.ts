import { useQueryClient, useMutation } from '@tanstack/react-query';
import addTodoListItem from '../api/addTodoListItem';
import { deleteListItem } from '../api/deleteListItem';
import editTodoListItem from '../api/editTodoListItem';

export const useListItem = (
  selector?: (mutates: {
    addListItemMutate: typeof addListItemMutate;
    deleteListItemMutate: typeof deleteListItemMutate;
    editListItemMutate: typeof editListItemMutate;
  }) => any
) => {
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

  const { mutate: deleteListItemMutate } = useMutation({
    mutationFn: ({
      id,
      date,
      targetId,
    }: {
      id: string;
      date: string;
      targetId: string;
    }) => deleteListItem(id, date, targetId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

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

  const mutates = {
    addListItemMutate,
    deleteListItemMutate,
    editListItemMutate,
  };

  return selector ? selector(mutates) : mutates;
};

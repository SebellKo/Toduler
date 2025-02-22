import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteListItem } from '../api/deleteListItem';

export const useDeleteListItem = () => {
  const queryClient = useQueryClient();

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

  return { deleteListItemMutate };
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteList } from '../api/deleteList';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteListMutate } = useMutation({
    mutationFn: ({ id, date }: { id: string; date: string }) =>
      deleteList(id, date),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return { deleteListMutate };
};

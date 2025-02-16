import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Flex, Typography, Button } from 'antd';
import { editTodoTitle } from '../api/editTodoTitle';
import { useState } from 'react';
import { deleteList } from '../api/deleteList';

interface Props {
  id: string;
  title: string;
  isRequired: boolean;
  handleClick: () => void;
}

function ToDoListHeader({ id, title, isRequired, handleClick }: Props) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, newTitle }: { id: string; newTitle: string }) =>
      editTodoTitle(id, newTitle),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { mutate: deleteListMutate } = useMutation({
    mutationFn: (id: string) => deleteList(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return (
    <Flex flex={1} align="center" justify="space-between">
      <Typography.Title
        level={4}
        editable={
          isRequired
            ? false
            : {
                onChange: (value) => {
                  if (value === title && value.trim().length === 0) return;
                  setIsEditMode(false);
                  mutate({ id: id, newTitle: value.trim() });
                },
                onStart: () => setIsEditMode(true),
              }
        }
        style={{ margin: 0 }}
      >
        {title}
      </Typography.Title>
      {isEditMode ? (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onMouseDown={() => deleteListMutate(id)}
        />
      ) : (
        <Button
          shape="circle"
          icon={<PlusCircleFilled />}
          onClick={handleClick}
        ></Button>
      )}
    </Flex>
  );
}

export default ToDoListHeader;

import { PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Flex, Typography, Button } from 'antd';
import { useState } from 'react';
import { editTodoTitle } from '../api/editTodoTitle';

interface Props {
  id: string;
  title: string;
  isRequired: boolean;
  handleClick: () => void;
}

function ToDoListHeader({ id, title, isRequired, handleClick }: Props) {
  const [text, setText] = useState<string>('');
  const [editedText, setEditedText] = useState<string>('what');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, newTitle }: { id: string; newTitle: string }) =>
      editTodoTitle(id, newTitle),
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
                  mutate({ id: id, newTitle: value.trim() });
                },
              }
        }
        style={{ margin: 0 }}
      >
        {title}
      </Typography.Title>
      <Button
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={handleClick}
      ></Button>
    </Flex>
  );
}

export default ToDoListHeader;

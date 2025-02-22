import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Flex, Typography, Button } from 'antd';
import { editTodoTitle } from '../../api/editTodoTitle';
import { useEffect, useState } from 'react';
import { deleteList } from '../../api/deleteList';
import { useDateStore } from '../../stores/dateStore';

interface Props {
  id: string;
  title: string;
  isRequired: boolean;
  handleClick: () => void;
}

function ToDoListHeader({ id, title, isRequired, handleClick }: Props) {
  const [text, setText] = useState<string>(title);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (text === title && text.trim().length === 0) return;
    mutate({
      id: id,
      date: selectedDate,
      newTitle: text.trim(),
    });
  }, [text]);

  const { mutate } = useMutation({
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

  const { mutate: deleteListMutate } = useMutation({
    mutationFn: (date: string) => deleteList(date),
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
                  setText(value);
                  setIsEditMode(false);
                },
                onStart: () => setIsEditMode(true),
              }
        }
        style={{ margin: 0 }}
      >
        {text}
      </Typography.Title>
      {isEditMode ? (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onMouseDown={() => deleteListMutate(selectedDate)}
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

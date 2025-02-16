import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox, Flex, Tag } from 'antd';
import ListItemContainer from '../../styles/components/ListItemContainer';
import { useState } from 'react';
import EditInput from './commons/EditInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import editTodoListItem from '../api/editTodoListItem';
import { deleteListItem } from '../api/deleteListItem';
import { useDateStore } from '../../stores/dateStore';

interface Props {
  id: string;
  listId: string;
  content: string;
  type: string;
  done: boolean;
  time?: string;
}

function TodoListItem({ id, listId, content, type, done, time }: Props) {
  const [text, setText] = useState<string>(content);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const selectedDate = useDateStore((state) => state.selectedDate);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      id,
      date,
      content,
      targetId,
      done,
    }: {
      id: string;
      date: string;
      content: string;
      targetId: string;
      done: boolean;
    }) => editTodoListItem(id, date, content, targetId, done),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { mutate: deleteMutate } = useMutation({
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

  const handleClickCancel = () => {
    setIsEditMode(false);
  };

  const handleClickConfirm = (editedText: string) => {
    mutate({
      id: listId,
      date: selectedDate,
      content: editedText,
      targetId: id,
      done: done,
    });
    setText(editedText);
    setIsEditMode(false);
  };

  const handleClickDelete = () => {
    deleteMutate({ id: listId, date: selectedDate, targetId: id });
  };

  return (
    <ListItemContainer>
      {isEditMode ? (
        <EditInput
          text={text}
          type={type}
          handleClickDelete={handleClickDelete}
          handleClickConfirm={handleClickConfirm}
          handleClickCancel={handleClickCancel}
        />
      ) : (
        <>
          {type === 'todo' ? (
            <Checkbox
              checked={done}
              onChange={(event) =>
                mutate({
                  id: listId,
                  date: selectedDate,
                  content: content,
                  targetId: id,
                  done: event.target.checked,
                })
              }
            >
              {text}
            </Checkbox>
          ) : (
            <Flex gap="sm">
              <Tag color="magenta">{time}</Tag>
              <Typography.Paragraph style={{ margin: 0 }}>
                {text}
              </Typography.Paragraph>
            </Flex>
          )}
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setIsEditMode(true)}
          />
        </>
      )}
    </ListItemContainer>
  );
}

export default TodoListItem;

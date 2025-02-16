import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox } from 'antd';
import ListItemContainer from '../../styles/components/ListItemContainer';
import { useState } from 'react';
import EditInput from './commons/EditInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import editTodoListItem from '../api/editTodoListItem';
import { deleteListItem } from '../api/deleteListItem';

interface Props {
  id: string;
  listId: string;
  content: string;
  type: string;
  done: boolean;
}

function TodoListItem({ id, listId, content, type, done }: Props) {
  const [text, setText] = useState<string>(content);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      id,
      content,
      targetId,
      done,
    }: {
      id: string;
      content: string;
      targetId: string;
      done: boolean;
    }) => editTodoListItem(id, content, targetId, done),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: ({ id, targetId }: { id: string; targetId: string }) =>
      deleteListItem(id, targetId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const handleClickCancel = () => {
    setIsEditMode(false);
  };

  const handleClickConfirm = (editedText: string) => {
    mutate({ id: listId, content: editedText, targetId: id, done: done });
    setText(editedText);
    setIsEditMode(false);
  };

  const handleClickDelete = () => {
    deleteMutate({ id: listId, targetId: id });
  };

  return (
    <ListItemContainer>
      {isEditMode ? (
        <EditInput
          text={text}
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
                  content: content,
                  targetId: id,
                  done: event.target.checked,
                })
              }
            >
              {text}
            </Checkbox>
          ) : (
            <Typography.Paragraph style={{ margin: 0 }}>
              {text}
            </Typography.Paragraph>
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

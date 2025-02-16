import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox } from 'antd';
import ListItemContainer from '../../styles/components/ListItemContainer';
import { useState } from 'react';
import EditInput from './commons/EditInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import editTodoListItem from '../api/editTodoListItem';

interface Props {
  id: string;
  listId: string;
  content: string;
  type: string;
}

function TodoListItem({ id, listId, content, type }: Props) {
  const [text, setText] = useState<string>(content);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      id,
      content,
      targetId,
    }: {
      id: string;
      content: string;
      targetId: string;
    }) => editTodoListItem(id, content, targetId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const handleClickCancel = () => {
    setIsEditMode(false);
  };

  const handleClickConfirm = (editedText: string) => {
    mutate({ id: id, content: editedText, targetId: listId });
    setText(editedText);
    setIsEditMode(false);
  };

  return (
    <ListItemContainer>
      {isEditMode ? (
        <EditInput
          text={text}
          handleClickConfirm={handleClickConfirm}
          handleClickCancel={handleClickCancel}
        />
      ) : (
        <>
          {type === 'todo' ? (
            <Checkbox>{text}</Checkbox>
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

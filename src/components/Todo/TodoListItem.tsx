import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox, Flex, Tag } from 'antd';
import { useState } from 'react';

import { useDateStore } from '../../stores/dateStore';
import { useEditListItem } from '../../hooks/useEditListItem';
import { useDeleteListItem } from '../../hooks/useDeleteListItem';

import ListItemContainer from '../../styles/components/ListItemContainer';
import EditInput from './commons/EditInput';

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
  const { editListItemMutate } = useEditListItem();
  const { deleteListItemMutate } = useDeleteListItem();

  const handleClickCancel = () => {
    setIsEditMode(false);
  };

  const handleClickConfirm = ({
    text,
    time,
  }: {
    text: string;
    time?: string;
  }) => {
    const req = time
      ? {
          id: listId,
          date: selectedDate,
          content: text,
          targetId: id,
          done: done,
          time: time,
        }
      : {
          id: listId,
          date: selectedDate,
          content: text,
          targetId: id,
          done: done,
        };

    editListItemMutate(req);
    setText(text);
    setIsEditMode(false);
  };

  const handleClickDelete = () => {
    deleteListItemMutate({ id: listId, date: selectedDate, targetId: id });
  };

  return (
    <ListItemContainer>
      {isEditMode ? (
        <EditInput
          text={text}
          type={type}
          time={time}
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
                editListItemMutate({
                  id: listId,
                  date: selectedDate,
                  content: content,
                  targetId: id,
                  done: event.target.checked,
                })
              }
              style={{ textDecoration: `${done ? 'line-through' : 'none'}` }}
            >
              {text}
            </Checkbox>
          ) : (
            <Flex gap="sm" align="center" flex={1}>
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

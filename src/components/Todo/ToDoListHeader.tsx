import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Button } from 'antd';
import { useEffect, useState } from 'react';

import { useDateStore } from '../../stores/dateStore';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';
import { useEditCategory } from '../../hooks/useEditCategory';

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
  const { deleteListMutate } = useDeleteCategory();
  const { editCategoryMutate } = useEditCategory();

  useEffect(() => {
    if (text === title && text.trim().length === 0) return;
    editCategoryMutate({
      id: id,
      date: selectedDate,
      newTitle: text.trim(),
    });
  }, [text]);

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

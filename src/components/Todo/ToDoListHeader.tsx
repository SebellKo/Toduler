import { DeleteOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Button } from 'antd';
import { useEffect, useState } from 'react';

import { useDateStore } from '../../stores/dateStore';
import { useCategory } from '../../hooks/useCategory';

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
  const deleteCategoryMutate = useCategory(
    (mutates) => mutates.deleteCategoryMutate
  );
  const editCategoryMutate = useCategory(
    (mutates) => mutates.editCategoryMutate
  );

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
          onMouseDown={() =>
            deleteCategoryMutate({ id: id, date: selectedDate })
          }
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

import { EditOutlined } from '@ant-design/icons';
import { Typography, Button, Checkbox } from 'antd';
import ListItemContainer from '../../styles/components/ListItemContainer';
import { useState } from 'react';
import EditInput from '../commons/EditInput';

interface Props {
  content: string;
  type: string;
}

function TodoListItem({ content, type }: Props) {
  const [text, setText] = useState<string>(content);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleClickCancel = () => {
    setIsEditMode(false);
  };

  const handleClickConfirm = (editedText: string) => {
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

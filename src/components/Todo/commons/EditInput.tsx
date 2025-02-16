import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Input, Flex, TimePicker } from 'antd';
import { useState } from 'react';

interface Props {
  text: string;
  type: string;
  handleClickDelete: () => void;
  handleClickConfirm: (value: string) => void;
  handleClickCancel: () => void;
}

function EditInput({
  text,
  type,
  handleClickDelete,
  handleClickConfirm,
  handleClickCancel,
}: Props) {
  const [editedValue, setEditedValue] = useState<string>(text);
  return (
    <Flex>
      <Flex align="center" gap="small">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleClickDelete}
        />
        {type === 'schedule' && <TimePicker></TimePicker>}
        <Input
          value={editedValue}
          onChange={(event) => setEditedValue(event.target.value)}
        />
      </Flex>
      <Flex align="center" gap={1}>
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={() => handleClickConfirm(editedValue)}
        ></Button>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClickCancel}
        ></Button>
      </Flex>
    </Flex>
  );
}

export default EditInput;

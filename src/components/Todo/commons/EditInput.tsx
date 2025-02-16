import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Input, Flex } from 'antd';
import { useState } from 'react';

interface Props {
  text: string;
  handleClickConfirm: (value: string) => void;
  handleClickCancel: () => void;
}

function EditInput({ text, handleClickConfirm, handleClickCancel }: Props) {
  const [editedValue, setEditedValue] = useState<string>(text);
  return (
    <>
      <Flex align="center" gap="small">
        <Button type="text" danger icon={<DeleteOutlined />} />
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
    </>
  );
}

export default EditInput;

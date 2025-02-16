import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Input, Flex } from 'antd';
import { useState } from 'react';

interface Props {
  text: string;
  handleClickDelete: () => void;
  handleClickConfirm: (value: string) => void;
  handleClickCancel: () => void;
}

function EditInput({
  text,
  handleClickDelete,
  handleClickConfirm,
  handleClickCancel,
}: Props) {
  const [editedValue, setEditedValue] = useState<string>(text);
  return (
    <>
      <Flex align="center" gap="small">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleClickDelete}
        />
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

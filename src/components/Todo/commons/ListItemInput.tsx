import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import { useState } from 'react';

interface Props {
  handleClickConfirm: (value: string) => void;
  handleClickCancel: () => void;
}

function ListItemInput({ handleClickConfirm, handleClickCancel }: Props) {
  const [value, setValue] = useState<string>('');
  return (
    <Flex>
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
      <Flex align="center" gap={1}>
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={() => handleClickConfirm(value)}
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

export default ListItemInput;

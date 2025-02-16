import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

interface Props {
  handleClickConfirm: () => void;
  handleClickCancel: () => void;
}

function EditRemove({ handleClickConfirm, handleClickCancel }: Props) {
  return (
    <Flex align="center" gap={1}>
      <Button
        type="text"
        icon={<CheckOutlined />}
        onClick={handleClickConfirm}
      ></Button>
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={handleClickCancel}
      ></Button>
    </Flex>
  );
}

export default EditRemove;

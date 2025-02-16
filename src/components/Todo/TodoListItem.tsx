import { EllipsisOutlined } from '@ant-design/icons';
import { Flex, Checkbox, Button } from 'antd';

interface Props {
  item: string;
}

function TodoListItem({ item }: Props) {
  return (
    <Flex flex={1} align="center" justify="space-between">
      <Checkbox>{item}</Checkbox>
      <Button type="text" icon={<EllipsisOutlined />}></Button>
    </Flex>
  );
}

export default TodoListItem;

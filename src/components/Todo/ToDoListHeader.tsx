import { PlusCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Button } from 'antd';

interface Props {
  title: string;
}

function ToDoListHeader({ title }: Props) {
  return (
    <Flex flex={1} align="center" justify="space-between">
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      <Button shape="circle" icon={<PlusCircleFilled />}></Button>
    </Flex>
  );
}

export default ToDoListHeader;

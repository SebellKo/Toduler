import { PlusCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Button } from 'antd';

function ToDoListHeader() {
  return (
    <Flex flex={1} align="center" justify="space-between">
      <Typography.Title level={4} style={{ margin: 0 }}>
        Todo
      </Typography.Title>
      <Button shape="circle" icon={<PlusCircleFilled />}></Button>
    </Flex>
  );
}

export default ToDoListHeader;

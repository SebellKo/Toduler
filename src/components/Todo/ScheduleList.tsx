import { Flex, List, Divider } from 'antd';
import ToDoListHeader from './ToDoListHeader';
import ListItem from './ListItem';
import { ListProps } from '../../types/listData';

function ScheduleList({ listData }: ListProps) {
  return (
    <Flex vertical={true} gap="middle">
      <ToDoListHeader title={listData.title}></ToDoListHeader>
      <List
        itemLayout="horizontal"
        dataSource={listData.contents}
        renderItem={(item) => (
          <ListItem type={listData.type} content={item.content}></ListItem>
        )}
      ></List>
      <Divider />
    </Flex>
  );
}

export default ScheduleList;

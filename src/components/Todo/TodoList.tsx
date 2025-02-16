import { Flex, List, Divider } from 'antd';
import ToDoListHeader from './ToDoListHeader';
import { ListProps } from '../../types/listData';
import ListItem from './ListItem';

function TodoList({ listData }: ListProps) {
  return (
    <Flex vertical={true} gap="middle">
      <ToDoListHeader title={listData.title}></ToDoListHeader>
      <List
        itemLayout="horizontal"
        dataSource={listData.contents}
        renderItem={(item) => (
          <ListItem type={listData.type} content={item.content} />
        )}
      ></List>
      <Divider />
    </Flex>
  );
}

export default TodoList;

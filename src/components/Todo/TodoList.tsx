import { Flex, List, Divider } from 'antd';
import ToDoListHeader from './ToDoListHeader';
import { ListProps } from '../../types/listData';
import TodoListItem from './TodoListItem';

function TodoList({ listData }: ListProps) {
  return (
    <Flex vertical={true} gap="middle">
      <ToDoListHeader
        title={listData.title}
        isRequired={listData.required}
      ></ToDoListHeader>
      <List
        itemLayout="horizontal"
        dataSource={listData.contents}
        renderItem={(item) => (
          <TodoListItem type={listData.type} content={item.content} />
        )}
      ></List>
      <Divider />
    </Flex>
  );
}

export default TodoList;

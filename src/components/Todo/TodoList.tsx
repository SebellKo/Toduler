import { Flex, List, Divider } from 'antd';
import ToDoListHeader from './ToDoListHeader';
import TodoListItem from './TodoListItem';

function TodoList() {
  return (
    <Flex vertical={true} gap="middle">
      <ToDoListHeader></ToDoListHeader>
      <List
        itemLayout="horizontal"
        dataSource={['apple', 'pear', 'watermelon', 'banana']}
        renderItem={(item) => <TodoListItem item={item}></TodoListItem>}
      ></List>
      <Divider />
    </Flex>
  );
}

export default TodoList;

import { Card } from 'antd';
import TodoList from './TodoList';

interface Props {
  selectedDate: string;
}

function Todo({ selectedDate }: Props) {
  return (
    <Card title={selectedDate} style={{ flex: 2 }}>
      <TodoList />
    </Card>
  );
}

export default Todo;

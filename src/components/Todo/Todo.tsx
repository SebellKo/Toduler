import { Card } from 'antd';
import TodoList from './TodoList';
import ScheduleList from './ScheduleList';
import styles from '../../styles/todo.module.css';

interface Props {
  selectedDate: string;
}

const ScheduleData = {
  id: 125,
  title: 'Schedules',
  type: 'schedule',
  required: true,
  contents: [
    {
      id: 3,
      done: false,
      time: '18:00',
      content: 'Apple meeting',
    },
    {
      id: 4,
      done: false,
      time: '19:00',
      content: 'Pear meeting',
    },
    {
      id: 5,
      done: false,
      time: '20:00',
      content: 'Watermelon meeting',
    },
  ],
};

const TodoData = [
  {
    id: 123,
    title: 'ToDos',
    type: 'todo',
    required: true,
    contents: [
      {
        id: 0,
        done: false,
        content: 'Apple',
      },
      {
        id: 1,
        done: false,
        content: 'Pear',
      },
      {
        id: 2,
        done: false,
        content: 'Banana',
      },
    ],
  },
  {
    id: 124,
    title: 'Chore',
    type: 'todo',
    required: false,
    contents: [
      {
        id: 6,
        done: false,
        content: 'Apple',
      },
      {
        id: 7,
        done: false,
        content: 'Pear',
      },
      {
        id: 8,
        done: false,
        content: 'Banana',
      },
    ],
  },
];

function Todo({ selectedDate }: Props) {
  return (
    <Card title={selectedDate} className={styles['todo-card']}>
      <ScheduleList listData={ScheduleData}></ScheduleList>;
      {TodoData.map((listItem) => (
        <TodoList key={listItem.id} listData={listItem}></TodoList>
      ))}
    </Card>
  );
}

export default Todo;

import { Button, Card } from 'antd';
import TodoList from './TodoList';
import styles from '../../styles/todo.module.css';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';

interface Props {
  selectedDate: string;
}

const TodoData = [
  {
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
  },
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
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const handleClickConfirm = () => {};
  const handleClickCancel = () => setIsClickCreateNew(false);
  return (
    <Card
      title={selectedDate}
      actions={
        isClickCreatNew
          ? [
              <ListItemInput
                handleClickConfirm={handleClickConfirm}
                handleClickCancel={handleClickCancel}
              ></ListItemInput>,
            ]
          : [
              <Button type="link" onClick={() => setIsClickCreateNew(true)}>
                Create New
              </Button>,
            ]
      }
      className={styles['todo-card']}
    >
      {TodoData.map((listItem) => (
        <TodoList key={listItem.id} listData={listItem}></TodoList>
      ))}
    </Card>
  );
}

export default Todo;

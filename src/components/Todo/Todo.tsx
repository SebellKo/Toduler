import { Button, Card } from 'antd';
import TodoList from './TodoList';
import styles from '../../styles/todo.module.css';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';
import { useQuery } from '@tanstack/react-query';
import { getTodoData } from '../api/getTodoData';

interface Props {
  selectedDate: string;
}

function Todo({ selectedDate }: Props) {
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const handleClickConfirm = () => {};
  const handleClickCancel = () => setIsClickCreateNew(false);

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodoData,
  });

  if (!data) return <></>;

  console.log(data);

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
      {data.map((listData) => {
        return <TodoList key={listData.id} listData={listData}></TodoList>;
      })}
    </Card>
  );
}

export default Todo;

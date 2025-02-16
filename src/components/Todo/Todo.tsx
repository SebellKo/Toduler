import { Button, Card } from 'antd';
import TodoList from './TodoList';
import styles from '../../styles/todo.module.css';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodoData } from '../api/getTodoData';
import { addTodoCategory } from '../api/addTodoCategory';

interface Props {
  selectedDate: string;
}

function Todo({ selectedDate }: Props) {
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const handleClickConfirm = (title: string) => {
    mutate(title);
    setIsClickCreateNew(false);
  };
  const handleClickCancel = () => setIsClickCreateNew(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (title: string) => addTodoCategory(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodoData,
  });

  if (!data) return <></>;

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

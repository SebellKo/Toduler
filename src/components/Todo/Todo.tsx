import { Button, Card } from 'antd';
import TodoList from './TodoList';
import styles from '../../styles/todo.module.css';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodoCategory } from '../../api/addTodoCategory';
import { getTodoData } from '../../api/getTodoData';
import { useDateStore } from '../../stores/dateStore';

function Todo() {
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const selectedDate = useDateStore((state) => state.selectedDate);

  const handleClickConfirm = (title: string) => {
    mutate({ title: title, date: selectedDate });
    setIsClickCreateNew(false);
  };
  const handleClickCancel = () => setIsClickCreateNew(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ title, date }: { title: string; date: string }) =>
      addTodoCategory(title, date),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const { data } = useQuery({
    queryKey: ['todos', selectedDate],
    queryFn: () => getTodoData(selectedDate),
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
      {data.data.map((listData) => {
        return <TodoList key={listData.id} listData={listData}></TodoList>;
      })}
    </Card>
  );
}

export default Todo;

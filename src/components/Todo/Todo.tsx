import { Button, Card } from 'antd';
import TodoList from './TodoList';
import styles from '../../styles/todo.module.css';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTodoCategory } from '../../api/addTodoCategory';
import { useDateStore } from '../../stores/dateStore';
import { createInitialList } from '../../utils/createInitialList';
import { getTodoData } from '../../api/getTodoData';

function Todo() {
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const selectedDate = useDateStore((state) => state.selectedDate);

  const { data: todoData } = useQuery({
    queryKey: ['todos', selectedDate],
    queryFn: () => getTodoData(selectedDate),
  });

  const handleClickConfirm = (title: string) => {
    mutate({ title: title, date: selectedDate });
    setIsClickCreateNew(false);
  };

  const handleClickCancel = () => setIsClickCreateNew(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ title, date }: { title: string; date: string }) =>
      addTodoCategory(title, date),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', selectedDate] }),
  });

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
      {todoData
        ? todoData.data.map((item) => (
            <TodoList key={item.id} listData={item}></TodoList>
          ))
        : createInitialList(selectedDate).data.map((item) => (
            <TodoList key={item.id} listData={item}></TodoList>
          ))}
    </Card>
  );
}

export default Todo;

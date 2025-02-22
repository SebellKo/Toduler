import { Button, Card } from 'antd';
import { useState } from 'react';

import { useDateStore } from '../../stores/dateStore';
import { useDayTodos } from '../../hooks/useDayTodos';
import { useAddCategory } from '../../hooks/useAddCategory';

import { createInitialList } from '../../utils/createInitialList';
import styles from '../../styles/todo.module.css';

import TodoList from './TodoList';
import ListItemInput from './commons/ListItemInput';

function Todo() {
  const [isClickCreatNew, setIsClickCreateNew] = useState<boolean>(false);
  const selectedDate = useDateStore((state) => state.selectedDate);
  const { todoData } = useDayTodos();
  const { addCategoryMutate } = useAddCategory();

  const handleClickConfirm = (title: string) => {
    addCategoryMutate({ title: title, date: selectedDate });
    setIsClickCreateNew(false);
  };

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

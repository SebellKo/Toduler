import { Flex, List, Divider } from 'antd';
import ToDoListHeader from './ToDoListHeader';
import { ListProps } from '../../types/listData';
import TodoListItem from './TodoListItem';
import { useState } from 'react';
import ListItemInput from './commons/ListItemInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import addTodoListItem from '../api/addTodoListItem';

function TodoList({ listData }: ListProps) {
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      addTodoListItem(id, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const handleClickConfirm = (content: string) => {
    setIsClickAdd(false);
    mutate({ id: listData.id, content: content });
  };
  const handleClickCancel = () => {
    setIsClickAdd(false);
  };

  const handleClickAddButton = () => setIsClickAdd(true);

  return (
    <Flex vertical={true} gap="middle">
      <ToDoListHeader
        handleClick={handleClickAddButton}
        title={listData.title}
        isRequired={listData.required}
      />
      {isClickAdd && (
        <ListItemInput
          handleClickConfirm={handleClickConfirm}
          handleClickCancel={handleClickCancel}
        ></ListItemInput>
      )}
      <List
        itemLayout="horizontal"
        dataSource={listData.contents}
        renderItem={(item) => (
          <TodoListItem
            key={item.id}
            type={listData.type}
            content={item.content}
          />
        )}
      ></List>
      <Divider />
    </Flex>
  );
}

export default TodoList;

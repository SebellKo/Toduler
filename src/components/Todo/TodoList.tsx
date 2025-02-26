import { Flex, List, Divider, TimePicker } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

import { useDateStore } from '../../stores/dateStore';
import { useListItem } from '../../hooks/useListItem';

import { ListProps } from '../../types/listData';
import ListItemInput from './commons/ListItemInput';
import ToDoListHeader from './ToDoListHeader';
import TodoListItem from './TodoListItem';

interface Props {
  listData: ListProps;
}

function TodoList({ listData }: Props) {
  const [isClickAdd, setIsClickAdd] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const selectedDate = useDateStore((state) => state.selectedDate);
  const addListItemMutate = useListItem((mutates) => mutates.addListItemMutate);

  const handleClickConfirm = (content: string) => {
    setIsClickAdd(false);
    const mutateObj =
      listData.type === 'todo'
        ? { id: listData.id, date: selectedDate, content: content }
        : {
            id: listData.id,
            date: selectedDate,
            content: content,
            time: selectedTime,
          };
    addListItemMutate(mutateObj);
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
        id={listData.id}
        isRequired={listData.required}
      />
      {isClickAdd &&
        (listData.type === 'todo' ? (
          <ListItemInput
            handleClickConfirm={handleClickConfirm}
            handleClickCancel={handleClickCancel}
          />
        ) : (
          <>
            <TimePicker
              format="HH:mm"
              onChange={(date) => setSelectedTime(dayjs(date).format('HH:mm'))}
            />
            <ListItemInput
              handleClickConfirm={handleClickConfirm}
              handleClickCancel={handleClickCancel}
            />
          </>
        ))}
      <List
        itemLayout="horizontal"
        dataSource={listData.contents}
        renderItem={(item) => {
          return (
            <TodoListItem
              key={item.id}
              id={item.id}
              listId={listData.id}
              type={listData.type}
              content={item.content}
              done={item.done}
              time={item.time}
            />
          );
        }}
      ></List>
      <Divider />
    </Flex>
  );
}

export default TodoList;

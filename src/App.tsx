import { Calendar, Card, Flex } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Todo from './components/Todo/Todo';

dayjs.locale('ko');

const formatDate = (date: Dayjs) => {
  return String(dayjs(date).format('YYYY.MM.DD.ddd'));
};

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(dayjs()));

  const handleSelectDate = (date: Dayjs) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD.ddd');

    setSelectedDate(formattedDate);
  };

  return (
    <Flex gap="small">
      <Card style={{ flex: 8 }}>
        <Calendar onSelect={(date) => handleSelectDate(date)}></Calendar>
      </Card>
      <Todo selectedDate={selectedDate} />
    </Flex>
  );
}

export default App;

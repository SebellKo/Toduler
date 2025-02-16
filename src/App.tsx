import { Flex } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Todo from './components/Todo/Todo';
import { formatDate } from './utils/formatDate';
import ScheduleCalendar from './components/Calendar/ScheduleCalendar';
import openDatabase from './utils/openDatabase';

dayjs.locale('ko');
openDatabase();

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(dayjs()));

  const handleSelectDate = (date: Dayjs) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD.ddd');

    setSelectedDate(formattedDate);
  };

  return (
    <Flex gap="small" style={{ padding: '0 40px', height: '90%' }}>
      <ScheduleCalendar handleSelectDate={handleSelectDate} />
      <Todo selectedDate={selectedDate} />
    </Flex>
  );
}

export default App;

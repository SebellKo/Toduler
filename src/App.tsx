import { Flex } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Todo from './components/Todo/Todo';
import { formatDate } from './utils/formatDate';
import ScheduleCalendar from './components/Calendar/ScheduleCalendar';
import openDatabase from './utils/db/openDatabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

dayjs.locale('ko');
openDatabase();

const queryClient = new QueryClient();

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(dayjs()));

  const handleSelectDate = (date: Dayjs) => {
    const formattedDate = dayjs(date).format('YYYY.MM.DD.ddd');

    setSelectedDate(formattedDate);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Flex gap="small" style={{ padding: '0 40px', height: '90%' }}>
        <ScheduleCalendar handleSelectDate={handleSelectDate} />
        <Todo selectedDate={selectedDate} />
      </Flex>
    </QueryClientProvider>
  );
}

export default App;

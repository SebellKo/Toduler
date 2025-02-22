import { Flex } from 'antd';
import { Suspense } from 'react';

import ScheduleCalendar from '../components/Calendar/ScheduleCalendar';
import Todo from '../components/Todo/Todo';
import CalendarFallback from '../components/Calendar/CalendarFallback';

function Home() {
  return (
    <Flex
      gap="large"
      style={{ padding: '0 40px', height: '90%', width: '100%' }}
    >
      <Suspense fallback={<CalendarFallback />}>
        <ScheduleCalendar />
      </Suspense>
      <Todo />
    </Flex>
  );
}

export default Home;

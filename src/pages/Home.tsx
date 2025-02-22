import { Flex } from 'antd';
import ScheduleCalendar from '../components/Calendar/ScheduleCalendar';
import Todo from '../components/Todo/Todo';

function Home() {
  return (
    <Flex gap="small" style={{ padding: '0 40px', height: '90%' }}>
      <ScheduleCalendar />
      <Todo />
    </Flex>
  );
}

export default Home;

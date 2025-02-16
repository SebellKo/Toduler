import { Flex } from 'antd';
import 'dayjs/locale/ko';
import Todo from './components/Todo/Todo';
import ScheduleCalendar from './components/Calendar/ScheduleCalendar';
import openDatabase from './utils/db/openDatabase';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

openDatabase();

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Flex gap="small" style={{ padding: '0 40px', height: '90%' }}>
        <ScheduleCalendar />
        <Todo />
      </Flex>
    </QueryClientProvider>
  );
}

export default App;

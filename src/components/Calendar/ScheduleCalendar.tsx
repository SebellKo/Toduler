import { Calendar, CalendarProps, Card } from 'antd';
import { Dayjs } from 'dayjs';
import DateCell from './DateCell';
import { useDateStore } from '../../stores/dateStore';
import { formatDate } from '../../utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { getTodoData } from '../api/getTodoData';
import { getAllToDos } from '../api/getAllToDos';

type ListData = {
  id: number;
  date: string;
  done: number;
  total: number;
  schedule: {
    id: number;
    time: string;
    content: string;
  }[];
};

const listData: ListData[] = [
  {
    id: 0,
    date: '2025.02.16.Sun',
    done: 3,
    total: 3,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
  {
    id: 1,
    date: '2025.02.17.Mon',
    done: 1,
    total: 10,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
  {
    id: 2,
    date: '2025.02.18.Wen',
    done: 2,
    total: 10,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
];

function ScheduleCalendar() {
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);

  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllToDos,
  });

  if (!data) return <></>;

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    const scheduleData = data.map((item) => {
      return {
        id: item.data[0].id,
        date: item.date,
        schedule: [...item.data[0].contents],
      };
    });

    const target = scheduleData.find(
      (item) => item.date === current.format('YYYY.MM.DD.ddd')
    );

    if (info.type === 'date' && target) return DateCell(target);
  };

  return (
    <Card style={{ flex: 8 }}>
      <Calendar
        cellRender={cellRender}
        onSelect={(date) => setSelectedDate(formatDate(date))}
      ></Calendar>
    </Card>
  );
}

export default ScheduleCalendar;

import { Calendar, CalendarProps, Card } from 'antd';
import { Dayjs } from 'dayjs';
import DateCell from './DateCell';

interface Props {
  handleSelectDate: (value: Dayjs) => void;
}

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
    date: '2025.02.16.일',
    done: 3,
    total: 3,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
  {
    id: 1,
    date: '2025.02.17.월',
    done: 1,
    total: 10,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
  {
    id: 2,
    date: '2025.02.18.수',
    done: 2,
    total: 10,
    schedule: [{ id: 0, time: '18:00', content: 'meeting' }],
  },
];

function ScheduleCalendar({ handleSelectDate }: Props) {
  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    const target = listData.find(
      (item) => item.date === current.format('YYYY.MM.DD.ddd')
    );

    if (info.type === 'date' && target) return DateCell(target);
  };

  return (
    <Card style={{ flex: 8 }}>
      <Calendar
        cellRender={cellRender}
        onSelect={(date) => handleSelectDate(date)}
      ></Calendar>
    </Card>
  );
}

export default ScheduleCalendar;

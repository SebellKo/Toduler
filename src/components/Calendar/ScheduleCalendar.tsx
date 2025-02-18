import { Calendar, CalendarProps, Card } from 'antd';
import { Dayjs } from 'dayjs';
import DateCell from './DateCell';
import { useDateStore } from '../../stores/dateStore';
import { formatDate } from '../../utils/formatDate';
import { useQuery } from '@tanstack/react-query';
import { getAllToDos } from '../../api/getAllToDos';

function ScheduleCalendar() {
  const { selectedDate, setSelectedDate } = useDateStore();
  const filteredDate = selectedDate.slice(0, 7);

  const { data: todoData } = useQuery({
    queryKey: ['todos', filteredDate],
    queryFn: () => getAllToDos(filteredDate),
  });

  if (!todoData) return <></>;

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    const scheduleData = todoData.map((item) => {
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

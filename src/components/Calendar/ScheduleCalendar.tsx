import { Calendar, CalendarProps } from 'antd';
import { Dayjs } from 'dayjs';

import { useDateStore } from '../../stores/dateStore';
import { useSort } from '../../hooks/useSort';
import { useMonthTodos } from '../../hooks/useMonthTodos';
import { formatDate } from '../../utils/formatDate';

import DateCell from './DateCell';

function ScheduleCalendar() {
  const { sortContents } = useSort();
  const setSelectedDate = useDateStore((state) => state.setSelectedDate);
  const { todoData } = useMonthTodos();

  if (!todoData) return <></>;

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    const scheduleData = todoData.map((item) => {
      return {
        id: item.data[0].id,
        date: item.date,
        schedule: [...sortContents(item.data[0].contents)],
      };
    });

    const target = scheduleData.find(
      (item) => item.date === current.format('YYYY.MM.DD.ddd')
    );

    if (info.type === 'date' && target) return DateCell(target);
  };

  return (
    <Calendar
      cellRender={cellRender}
      onSelect={(date) => setSelectedDate(formatDate(date))}
      style={{ flex: 8 }}
    ></Calendar>
  );
}

export default ScheduleCalendar;

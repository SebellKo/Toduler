import { Badge } from 'antd';
import styles from '../../styles/schedule-calendar.module.css';

interface Props {
  id: number;
  date: string;
  done: number;
  total: number;
  schedule: {
    id: number;
    time: string;
    content: string;
  }[];
}

function DateCell(item: Props) {
  const { schedule, done, total } = item;
  return (
    <ul className={styles.events}>
      <li>
        <Badge
          status={done === total ? 'success' : 'processing'}
          text={`${done} of ${total} Completed`}
        ></Badge>
      </li>
      {schedule.map((item) => (
        <li key={item.id}>
          <Badge status="error" text={item.content}></Badge>
        </li>
      ))}
    </ul>
  );
}

export default DateCell;

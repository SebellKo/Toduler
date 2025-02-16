import { Tag } from 'antd';
import styles from '../../styles/schedule-calendar.module.css';
import { ContentData } from '../../types/listData';

interface Props {
  id: string;
  date: string;
  schedule: ContentData[];
}

function DateCell(item: Props) {
  const { schedule } = item;
  return (
    <ul className={styles.events}>
      {schedule.map((item) => (
        <li key={item.id}>
          <Tag color="magenta">{item.time}</Tag>
          {item.content}
        </li>
      ))}
    </ul>
  );
}

export default DateCell;

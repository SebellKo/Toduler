import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date: Dayjs) => {
  return String(dayjs(date).format('YYYY.MM.DD.ddd'));
};

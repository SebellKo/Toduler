import { create } from 'zustand';
import { formatDate } from '../utils/formatDate';
import dayjs from 'dayjs';

interface Store {
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

export const useDateStore = create<Store>((set) => ({
  selectedDate: formatDate(dayjs()),
  setSelectedDate: (newDate) => set({ selectedDate: newDate }),
}));

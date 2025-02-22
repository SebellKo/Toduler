export const createInitialList = (date: string) => {
  const initialData = {
    date: date,
    data: [
      {
        id: 'schedules',
        title: 'Schedules',
        type: 'schedule',
        required: true,
        contents: [],
      },
      {
        id: 'todos',
        title: 'ToDos',
        type: 'todo',
        required: true,
        contents: [],
      },
    ],
  };

  return initialData;
};

type ContentData = {
  id: string;
  done: boolean;
  content: string;
  time?: string;
};

export interface ListProps {
  id: string;
  title: string;
  type: string;
  required: boolean;
  contents: ContentData[];
}

export interface ListData {
  date: string;
  data: ListProps[];
}

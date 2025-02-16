interface ContentData {
  id: string;
  done: boolean;
  content: string;
  time?: string;
}

export interface ListProps {
  listData: {
    id: string;
    title: string;
    type: string;
    required: boolean;
    contents: ContentData[];
  };
}

interface ContentData {
  id: number;
  done: boolean;
  content: string;
}

interface SchduleContentData extends ContentData {
  time: string;
}

export interface ListProps {
  listData: {
    id: number;
    title: string;
    type: string;
    required: boolean;
    contents: ContentData[] | SchduleContentData[];
  };
}

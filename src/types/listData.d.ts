interface ContentData {
  id: string;
  done: boolean;
  content: string;
}

interface SchduleContentData extends ContentData {
  time: string;
}

export interface ListProps {
  listData: {
    id: string;
    title: string;
    type: string;
    required: boolean;
    contents: ContentData[] | SchduleContentData[];
  };
}

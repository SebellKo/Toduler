import { PlusCircleFilled } from '@ant-design/icons';
import { Flex, Typography, Button } from 'antd';
import { useState } from 'react';

interface Props {
  title: string;
  isRequired: boolean;
}

function ToDoListHeader({ title, isRequired }: Props) {
  const [text, setText] = useState<string>(title);
  const [editedText, setEditedText] = useState<string>('');
  return (
    <Flex flex={1} align="center" justify="space-between">
      <Typography.Title
        level={4}
        editable={
          isRequired
            ? false
            : { onChange: setEditedText, onEnd: () => setText(editedText) }
        }
        style={{ margin: 0 }}
      >
        {text}
      </Typography.Title>
      <Button shape="circle" icon={<PlusCircleFilled />}></Button>
    </Flex>
  );
}

export default ToDoListHeader;

import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Button, Input, Flex, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

interface Props {
  text: string;
  type: string;
  time?: string;
  handleClickDelete: () => void;
  handleClickConfirm: ({
    text,
    time,
  }: {
    text: string;
    time: string | undefined;
  }) => void;
  handleClickCancel: () => void;
}

function EditInput({
  text,
  type,
  time,
  handleClickDelete,
  handleClickConfirm,
  handleClickCancel,
}: Props) {
  const [editedValue, setEditedValue] = useState<string>(text);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(time);
  console.log(selectedTime);
  return (
    <Flex>
      <Flex align="center" gap="small">
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleClickDelete}
        />
        {type === 'schedule' && (
          <TimePicker
            format="HH:mm"
            value={dayjs(selectedTime, 'HH:mm')}
            onChange={(date) => setSelectedTime(dayjs(date).format('HH:mm'))}
          ></TimePicker>
        )}
        <Input
          value={editedValue}
          onChange={(event) => setEditedValue(event.target.value)}
        />
      </Flex>
      <Flex align="center" gap={1}>
        <Button
          type="text"
          icon={<CheckOutlined />}
          onClick={() =>
            handleClickConfirm({
              text: editedValue,
              time: time ? selectedTime : undefined,
            })
          }
        ></Button>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClickCancel}
        ></Button>
      </Flex>
    </Flex>
  );
}

export default EditInput;

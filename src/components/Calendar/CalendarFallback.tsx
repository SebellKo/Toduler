import { Flex, Spin } from 'antd';

function CalendarFallback() {
  return (
    <Flex flex={8} align="center" justify="center">
      <Spin />
    </Flex>
  );
}

export default CalendarFallback;

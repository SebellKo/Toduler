import { Flex } from 'antd';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function ListItemContainer({ children }: Props) {
  return (
    <Flex flex={1} align="center" justify="space-between">
      {children}
    </Flex>
  );
}

export default ListItemContainer;

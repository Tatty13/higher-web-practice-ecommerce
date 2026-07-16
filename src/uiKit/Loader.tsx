import type { FC } from 'react';
import { Flex, Spin, Typography } from 'antd';

type LoaderProps = {
  title?: string;
  description?: string;
};

export const Loader: FC<LoaderProps> = ({ title, description }) => {
  return (
    <Flex
      vertical
      justify='center'
      align='center'
      gap='middle'>
      {title && (
        <Typography.Title
          style={{ textAlign: 'center' }}
          level={5}>
          {title}
        </Typography.Title>
      )}
      {description && <Typography.Text>{description}</Typography.Text>}
      <Spin />
    </Flex>
  );
};

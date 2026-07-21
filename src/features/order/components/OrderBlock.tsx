import type { FC, PropsWithChildren } from 'react';
import { Typography } from 'antd';

import utils from '@/utils';
import { Card } from '@/uiKit';

type OrderBlockProps = PropsWithChildren<{
  title: string;
}>;
export const OrderBlock: FC<OrderBlockProps> = ({ title, children }) => {
  const { isMobile } = utils.responsive.useResponsive();

  return (
    <Card
      vertical
      padding='medium'
      gap={20}>
      <Typography.Title level={isMobile ? 4 : 3}>{title}</Typography.Title>
      {children}
    </Card>
  );
};

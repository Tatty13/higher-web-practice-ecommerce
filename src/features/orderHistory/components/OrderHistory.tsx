import { type FC } from 'react';
import { Flex, Typography } from 'antd';

import { api } from '@/api';

import { OrderList } from './OrderList';

export const OrderHistory: FC = () => {
  const { data: items, isLoading } = api.order.useGetOrderHistoryQuery();

  return (
    <Flex
      vertical
      gap='middle'>
      <Typography.Title level={2}>История заказов</Typography.Title>
      <OrderList
        items={items}
        isLoading={isLoading}
      />
    </Flex>
  );
};

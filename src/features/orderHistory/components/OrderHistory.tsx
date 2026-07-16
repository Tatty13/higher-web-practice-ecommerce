import { type FC } from 'react';
import { Flex, Typography } from 'antd';

import { api } from '@/api';
import { selectorsAuth } from '@/features/auth';
import { useAppSelector } from '@/store';

import { OrderList } from './OrderList';
import { skipToken } from '@reduxjs/toolkit/query';

export const OrderHistory: FC = () => {
  const userId = useAppSelector(selectorsAuth.userId);

  const { data: items, isLoading } = api.order.useGetOrdersByUserIdQuery(
    userId ?? skipToken,
  );

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

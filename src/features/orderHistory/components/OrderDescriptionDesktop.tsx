import { type FC } from 'react';
import { Flex, Typography } from 'antd';

import utils from '@/utils';
import type { Order } from '@/types';

import { helpersOrderHistory } from '../helpers';
import { OrderStatus } from './OrderStatus';

type OrderDescriptionDesktopProps = {
  order: Order;
};

export const OrderDescriptionDesktop: FC<OrderDescriptionDesktopProps> = ({
  order,
}) => {
  return (
    <Flex justify='space-between'>
      <Flex
        vertical
        gap='small'>
        <Flex
          gap='small'
          align='center'>
          <Typography.Title level={3}>
            {`от ${utils.date.formatDateToReadableString(order.createdAt)}`}
          </Typography.Title>
          <Typography.Text>№ {order.number.slice(6)}</Typography.Text>
        </Flex>
        <Flex
          gap='small'
          align='center'>
          <OrderStatus
            strong
            status={order.status}>
            {helpersOrderHistory.orderStatusMap[order.status]}
          </OrderStatus>
          <Typography.Text type='secondary'>
            {helpersOrderHistory.getDeliveryMethod(
              order.deliveryMethod,
              order.status,
            )}
          </Typography.Text>
        </Flex>
      </Flex>
      <Flex
        vertical
        align='flex-end'>
        <Typography.Title level={2}>
          {utils.finance.getFormatPriceWithCurrency(order.totalPrice)}
        </Typography.Title>
        <Typography.Text type='secondary'>
          {helpersOrderHistory.getPaymentDescription(
            order.paymentMethod,
            order.status,
          )}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

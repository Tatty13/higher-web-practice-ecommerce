import { type FC } from 'react';
import { Flex, Typography } from 'antd';

import utils from '@/utils';
import type { Order } from '@/types';

import { helpersOrderHistory } from '../helpers';
import { OrderStatus } from './OrderStatus';

type OrderDescriptionMobileProps = {
  order: Order;
};

export const OrderDescriptionMobile: FC<OrderDescriptionMobileProps> = ({
  order,
}) => {
  return (
    <Flex
      vertical
      gap='small'>
      <Flex
        gap='small'
        align='center'
        justify='space-between'>
        <Typography.Title level={3}>
          {`от ${utils.date.formatDateToReadableString(order.createdAt)}`}
        </Typography.Title>
        <Typography.Text>№ {order.number.slice(-4)}</Typography.Text>
      </Flex>
      <Flex
        vertical
        gap='small'>
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
        align='flex-end'
        justify='space-between'>
        <Typography.Text type='secondary'>
          {helpersOrderHistory.getPaymentDescription(
            order.paymentMethod,
            order.status,
          )}
        </Typography.Text>

        <Typography.Title level={2}>
          {utils.finance.getFormatPriceWithCurrency(order.totalPrice)}
        </Typography.Title>
      </Flex>
    </Flex>
  );
};

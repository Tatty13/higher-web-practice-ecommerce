import { useState, type FC } from 'react';
import { Button, Flex, List, Typography } from 'antd';
import styled from 'styled-components';

import { ArrowIcon } from '@/assets';
import { theme } from '@/theme/styledTheme';
import { Card, Divider } from '@/uiKit';
import utils from '@/utils';
import type { Order, OrderStatus } from '@/types';

import { helpersOrderHistory } from '../helpers';
import { ProductLisOrderHistory } from './ProductList';

type OrderListProps = {
  items: Order[] | undefined;
  isLoading: boolean;
};

export const OrderList: FC<OrderListProps> = ({ items, isLoading }) => {
  const [visibleProductList, setVisibleProductList] =
    useState<Record<string, boolean>>();

  const toggleProductListVisibility = (orderId: string) => {
    setVisibleProductList((prev) => ({
      ...(prev || {}),
      [orderId]: !prev?.[orderId],
    }));
  };

  return (
    <List
      dataSource={items}
      rowKey='id'
      split={false}
      loading={isLoading}
      renderItem={(order) => {
        const isShowProductList = visibleProductList?.[order.id];
        const btnText = isShowProductList
          ? 'Свернуть товары'
          : 'Показать товары в заказе';
        const btnIconRotate = isShowProductList ? '90deg' : '-90deg';

        return (
          <List.Item>
            <Card
              vertical
              key={order.id}>
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
                    <StyledOrderStatus
                      strong
                      status={order.status}>
                      {helpersOrderHistory.orderStatusMap[order.status]}
                    </StyledOrderStatus>
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
              <Divider margin='16px 0 0' />
              {isShowProductList && (
                <ProductLisOrderHistory items={order.items} />
              )}
              <StylesButton
                type='link'
                icon={<ArrowIcon style={{ rotate: btnIconRotate }} />}
                iconPosition='end'
                onClick={() => toggleProductListVisibility(order.id)}>
                {btnText}
              </StylesButton>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

const StyledOrderStatus = styled(Typography.Text)<{ status: OrderStatus }>`
  color: ${({ status }) =>
    status === 'delivered'
      ? theme.colors.success
      : theme.colors.accentSecondary};
`;

const StylesButton = styled(Button)`
  margin-top: 16px;
`;

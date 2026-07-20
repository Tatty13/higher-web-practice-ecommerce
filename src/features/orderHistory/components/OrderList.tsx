import { useState, type FC } from 'react';
import { Button, List } from 'antd';
import styled from 'styled-components';

import { ArrowIcon } from '@/assets';
import { Card, Divider } from '@/uiKit';
import utils from '@/utils';
import type { Order } from '@/types';

import { ProductLisOrderHistory } from './ProductList';
import { OrderDescriptionDesktop } from './OrderDescriptionDesktop';
import { OrderDescriptionMobile } from './OrderDescriptionMobile';

type OrderListProps = {
  items: Order[] | undefined;
  isLoading: boolean;
};

export const OrderList: FC<OrderListProps> = ({ items, isLoading }) => {
  const { isMobile } = utils.responsive.useResponsive();

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
              {isMobile ? (
                <OrderDescriptionMobile order={order} />
              ) : (
                <OrderDescriptionDesktop order={order} />
              )}
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

const StylesButton = styled(Button)`
  margin-top: 16px;
`;

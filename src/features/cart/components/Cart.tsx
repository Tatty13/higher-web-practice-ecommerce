import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Flex, Row, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { ShoppingImage } from '@/assets';
import { tokens } from '@/theme/tokens';
import utils from '@/utils';

import { ProductLisCart } from './ProductList';
import { Summary } from './Summary';

export const Cart: FC = () => {
  const navigate = useNavigate();

  const { data: cart, isLoading } = api.cart.useGetCartQuery();

  const { items = [], totalPrice = 0, totalItems = 0 } = cart || {};

  const createOrder = () => {
    navigate(ROUTE_PATHS.order);
  };

  return (
    <Container
      vertical
      gap='middle'>
      <Typography.Title level={2}>Корзина</Typography.Title>

      <Content gutter={20}>
        <Col
          xs={{ flex: '100%' }}
          lg={{ flex: '65%' }}>
          {
            <ProductLisCart
              items={items}
              isLoading={isLoading}
            />
          }
        </Col>
        <SummaryCol
          xs={{ flex: '100%' }}
          md={{ flex: '60%' }}
          lg={{ flex: '35%' }}>
          <Summary
            isDisabledSubmit={!items?.length}
            totalPrice={utils.finance.getFormatPriceWithCurrency(totalPrice)}
            totalItems={utils.declension.getProductCountDescription(totalItems)}
            onSubmitOrder={createOrder}
          />
        </SummaryCol>
      </Content>
      <Flex></Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  height: 100%;
  background: url(${ShoppingImage}) right 0 bottom 0 / 35% no-repeat;

  @media screen and (${tokens.app.mediaMobileWidthM}) {
    background: none;
  }
`;

const Content = styled(Row)`
  @media screen and (${tokens.app.mediaMobileWidthM}) {
    height: 100%;
  }
`;

const SummaryCol = styled(Col)`
  @media screen and (${tokens.app.mediaMobileWidthM}) {
    align-self: flex-end;
  }
`;

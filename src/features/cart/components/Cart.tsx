import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Flex, Row, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { ShoppingImage } from '@/assets';
import { Card } from '@/uiKit';
import utils from '@/utils';

import { ProductLisCart } from './ProductList';

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

      <Row gutter={20}>
        <Col
          md={{ flex: '100%' }}
          lg={{ flex: '65%' }}>
          {
            <ProductLisCart
              items={items}
              isLoading={isLoading}
            />
          }
        </Col>
        <Col
          sm={{ flex: '100%' }}
          md={{ flex: '50%' }}
          lg={{ flex: '35%' }}>
          <Card
            vertical
            gap='middle'>
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Title level={3}>Ваша корзина</Typography.Title>
              <Typography.Text type='secondary'>
                {utils.declension.getProductCountDescription(totalItems)}
              </Typography.Text>
            </TextContainer>
            <TextContainer
              align='center'
              justify='space-between'
              gap='small'>
              <Typography.Text type='secondary'>сумма заказа</Typography.Text>
              <Typography.Title
                level={1}
                type='success'>
                {utils.finance.getFormatPriceWithCurrency(totalPrice)}
              </Typography.Title>
            </TextContainer>
            <Button
              size='large'
              type='primary'
              disabled={!items?.length}
              onClick={createOrder}>
              Оформить заказ
            </Button>
          </Card>
        </Col>
      </Row>
      <Flex></Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  height: 100%;
  background: url(${ShoppingImage}) right 0 bottom 0 / 35% no-repeat;
`;

const TextContainer = styled(Flex)`
  width: 100%;
`;

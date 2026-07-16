import type { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Col, Empty, Flex, List, Row, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { theme } from '@/theme/styledTheme';
import { Card, Divider } from '@/uiKit';
import utils from '@/utils';
import type { Order } from '@/types';

import { helpersOrder } from '../helpers';

type OrderConfirmLocationState = {
  order?: Order;
};

export const OrderConfirmation: FC = () => {
  const location = useLocation();
  const state = location.state as OrderConfirmLocationState | null;

  const order = state?.order;

  if (!order) {
    return <Empty>Заказ не найден</Empty>;
  }

  const { data: pickupPoints } = api.location.useGetPickupPointsQuery();

  const renderDeliveryAddress = () => {
    if (order?.deliveryMethod === 'courier') {
      return (
        <Flex vertical>
          <SubText>Доставка курьером</SubText>
          <Typography.Text>{order.deliveryAddress}</Typography.Text>
        </Flex>
      );
    }

    const pickupPoint = pickupPoints?.find(
      (pickupPoint) => pickupPoint.id === order.pickupPointId,
    );

    return (
      <Flex vertical>
        <SubText>Пункт выдачи</SubText>
        <Typography.Text>{pickupPoint?.address}</Typography.Text>
      </Flex>
    );
  };

  const renderDeliveryDate = () => {
    if (order?.deliveryMethod === 'courier') {
      return (
        <Flex vertical>
          <SubText>Доставят после</SubText>
          <Typography.Text>
            {helpersOrder.getFakeDeliveryTime()}
          </Typography.Text>
        </Flex>
      );
    }

    return (
      <Flex vertical>
        <SubText>Забирать после</SubText>
        <Typography.Text>{helpersOrder.getFakeDeliveryTime()}</Typography.Text>
      </Flex>
    );
  };

  const renderPaymentMethod = () => {
    const paymentMethod = order.paymentMethod;
    let text;

    switch (paymentMethod) {
      case 'card_online':
        text = 'Оплачено картой';
        break;
      case 'card_on_delivery':
        text = 'Оплата картой при получении';
        break;
      case 'cash':
      default:
        text = 'Оплата наличными при получении';
    }

    return <SubText>{text}</SubText>;
  };

  return (
    <Container
      vertical
      gap='large'>
      <Flex
        vertical
        gap='small'>
        <Typography.Title level={1}>Спасибо за покупку!</Typography.Title>
        <Typography.Title level={3}>
          Мы уже готовим выбранные усы к отправке!
        </Typography.Title>
      </Flex>
      <Card
        vertical
        padding='large'
        gap={20}>
        <Flex
          vertical
          gap='small'>
          <Typography.Text strong>Получатель</Typography.Text>
          <Flex
            gap={24}
            align='center'>
            <Typography.Text>
              {order.customer.firstName} {order.customer.lastName}
            </Typography.Text>
            <SubText>{order.customer.email}</SubText>
            <SubText>
              {utils.numbers.denormalizeNumber(order.customer.phone)}
            </SubText>
          </Flex>
          {order.comment && <Typography.Text>{order.comment}</Typography.Text>}
        </Flex>

        <Divider />

        <Row gutter={[20, 30]}>
          <Col span={12}>{renderDeliveryAddress()}</Col>
          <Col span={12}>{renderDeliveryDate()}</Col>
        </Row>

        <Divider />

        <List
          dataSource={order.items}
          rowKey='productId'
          split={false}
          grid={{
            gutter: 16,
            xxl: 2,
            xl: 2,
            lg: 2,
            md: 2,
            sm: 1,
            xs: 1,
          }}
          renderItem={(product) => {
            return (
              <List.Item>
                <Flex
                  gap='small'
                  align='center'>
                  <img
                    src={product.image}
                    width={80}
                    alt={product.name}
                  />
                  <Flex vertical>
                    <ProductTitle>{product.name}</ProductTitle>
                    <Flex gap='small'>
                      <Typography.Title level={3}>
                        {utils.finance.getFormatPriceWithCurrency(
                          product.price,
                        )}
                      </Typography.Title>
                      <Typography.Text type='secondary'>
                        {product.quantity} шт.
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </List.Item>
            );
          }}
        />

        <Divider />

        <Flex gap='large'>
          <Flex vertical>
            <SubText>Общая сумма</SubText>
            <Typography.Title level={1}>
              {utils.finance.getFormatPriceWithCurrency(order.totalPrice)}
            </Typography.Title>
          </Flex>
          {renderPaymentMethod()}
        </Flex>
      </Card>

      <Flex
        gap='large'
        justify='space-between'>
        <Button
          type='primary'
          size='large'
          onClick={() => {
            // stub
          }}>
          Распечатать
        </Button>
        <Link to={ROUTE_PATHS.orderHistory}>
          <LinkTitle>Все заказы</LinkTitle>
        </Link>
      </Flex>
    </Container>
  );
};

const Container = styled(Flex)`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
`;

const SubText = styled(Typography.Text)`
  font-size: 14px;
  color: ${theme.colors.neutralSecondary};
`;

const ProductTitle = styled(Typography.Text)`
  color: ${theme.colors.accentSecondary};
`;

const LinkTitle = styled.span`
  color: ${theme.colors.accentSecondary};
`;

import type { FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Empty, Flex, List, Row, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { theme } from '@/theme/styledTheme';
import { Card, Divider, Text } from '@/uiKit';
import utils from '@/utils';
import type { Order } from '@/types';

import { helpersOrder } from '../helpers';
import { tokens } from '@/theme/tokens';

type OrderConfirmLocationState = {
  order?: Order;
};

export const OrderConfirmation: FC = () => {
  const { isMobile } = utils.responsive.useResponsive();
  const navigate = useNavigate();
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
        <Typography.Title level={1}>Спасибо за заказ!</Typography.Title>
        {!isMobile && (
          <Typography.Title level={3}>
            Мы уже готовим выбранные усы к отправке!
          </Typography.Title>
        )}
      </Flex>
      <Card
        vertical
        padding='large'
        gap={20}>
        <Flex
          vertical
          gap='small'>
          <Typography.Text strong>Получатель</Typography.Text>
          <CustomerInfo>
            <Typography.Text>
              {order.customer.firstName} {order.customer.lastName}
            </Typography.Text>
            <SubText>{order.customer.email}</SubText>
            <SubText>
              {utils.numbers.denormalizeNumber(order.customer.phone)}
            </SubText>
          </CustomerInfo>
          {order.comment && <Typography.Text>{order.comment}</Typography.Text>}
        </Flex>

        <Divider />

        <Row gutter={[20, 8]}>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}>
            {renderDeliveryAddress()}
          </Col>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}>
            {renderDeliveryDate()}
          </Col>
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
                    <AccentText>{product.name}</AccentText>
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

      <Controls gap='large'>
        <Button
          type={isMobile ? 'default' : 'primary'}
          size='large'
          onClick={() => {
            // stub
          }}>
          Распечатать
        </Button>
        <StyledLink to={ROUTE_PATHS.orderHistory}>
          <AccentText>Все заказы</AccentText>
        </StyledLink>

        {isMobile && (
          <>
            <Divider />
            <Button
              type='primary'
              size='large'
              onClick={() => {
                navigate(ROUTE_PATHS.main);
              }}>
              Вернуться к покупкам
            </Button>
          </>
        )}
      </Controls>
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

const AccentText = styled(Text)`
  color: ${theme.colors.accentSecondary};
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

const CustomerInfo = styled(Flex)`
  gap: 24px;
  align-items: center;

  @media screen and (${tokens.app.mediaMobileWidthM}) {
    flex-direction: column;
    gap: 4px;
    align-items: start;
  }
`;

const Controls = styled(Flex)`
  justify-content: space-between;

  @media screen and (${tokens.app.mediaMobileWidthS}) {
    flex-direction: column;
    justify-content: stretch;
  }
`;

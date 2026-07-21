import type { FC } from 'react';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { Card } from '@/uiKit';
import utils from '@/utils';

type SummaryProps = {
  isDisabledSubmit: boolean;
  totalItems: string;
  totalPrice: string;
  onSubmitOrder: () => void;
};

export const Summary: FC<SummaryProps> = ({
  isDisabledSubmit,
  totalItems,
  totalPrice,
  onSubmitOrder,
}) => {
  const { isMobile } = utils.responsive.useResponsive();

  if (isMobile) {
    return (
      <Card
        vertical
        gap='middle'>
        <TextContainer
          align='center'
          justify='space-between'
          gap='small'>
          <Typography.Title
            level={1}
            type='success'>
            {totalPrice}
          </Typography.Title>
          <Typography.Text type='secondary'>{totalItems}</Typography.Text>
        </TextContainer>
        <Button
          size='large'
          type='primary'
          disabled={isDisabledSubmit}
          onClick={onSubmitOrder}>
          Оформить заказ
        </Button>
      </Card>
    );
  }

  return (
    <Card
      vertical
      gap='middle'>
      <TextContainer
        align='center'
        justify='space-between'
        gap='small'>
        <Typography.Title level={3}>Ваша корзина</Typography.Title>
        <Typography.Text type='secondary'>{totalItems}</Typography.Text>
      </TextContainer>
      <TextContainer
        align='center'
        justify='space-between'
        gap='small'>
        <Typography.Text type='secondary'>сумма заказа</Typography.Text>
        <Typography.Title
          level={1}
          type='success'>
          {totalPrice}
        </Typography.Title>
      </TextContainer>
      <Button
        size='large'
        type='primary'
        disabled={isDisabledSubmit}
        onClick={onSubmitOrder}>
        Оформить заказ
      </Button>
    </Card>
  );
};

const TextContainer = styled(Flex)`
  width: 100%;
`;

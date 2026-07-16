import type { FC } from 'react';
import { Button, Flex, List, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { BasketIcon } from '@/assets';
import { Card } from '@/uiKit';
import { theme } from '@/theme/styledTheme';
import utils from '@/utils';
import type { CartItem } from '@/types';

type ProductListCartProps = {
  items: CartItem[];
  isLoading: boolean;
};

export const ProductLisCart: FC<ProductListCartProps> = ({
  items,
  isLoading,
}) => {
  const [decrementCartItem, { isLoading: isLoadingDecrement }] =
    api.cart.useDecrementCartItemMutation();
  const [incrementCartItem, { isLoading: isLoadingIncrement }] =
    api.cart.useIncrementCartItemMutation();
  const [removeCartItem, { isLoading: isLoadingRemove }] =
    api.cart.useRemoveCartItemMutation();

  const isLoadingAction =
    isLoadingDecrement || isLoadingIncrement || isLoadingRemove;

  const decrementQuantity = async (productId: string) => {
    await decrementCartItem({ productId });
  };
  const incrementQuantity = async (productId: string) => {
    await incrementCartItem({ productId });
  };
  const removeFromCart = async (productId: string) => {
    await removeCartItem({ productId });
  };

  return (
    <List
      dataSource={items}
      rowKey='productId'
      size='large'
      split={false}
      loading={isLoading}
      renderItem={({ product, quantity, productId }) => {
        return (
          <Item>
            <Card
              align='center'
              justify='space-between'
              gap='large'
              wrap>
              <Flex
                align='center'
                gap='small'
                flex={1}>
                <img
                  src={product.images[0]}
                  width={80}
                  alt={product.name}
                />
                <Title ellipsis={{ tooltip: product.name }}>
                  {product.name}
                </Title>
              </Flex>

              <Flex gap={32}>
                <Flex
                  gap='middle'
                  align='center'>
                  <CountButton
                    disabled={isLoadingAction}
                    onClick={() => decrementQuantity(productId)}>
                    -
                  </CountButton>
                  <Typography.Title level={3}>{quantity}</Typography.Title>
                  <CountButton
                    disabled={isLoadingAction}
                    onClick={() => incrementQuantity(productId)}>
                    +
                  </CountButton>
                </Flex>

                <Typography.Title level={2}>
                  {utils.finance.getFormatPriceWithCurrency(product.price)}
                </Typography.Title>

                <BasketButton
                  type='text'
                  icon={<BasketIcon />}
                  disabled={isLoadingAction}
                  onClick={() => removeFromCart(productId)}
                />
              </Flex>
            </Card>
          </Item>
        );
      }}
    />
  );
};

const Item = styled(List.Item)`
  &&& {
    padding: 0 0 16px;
  }
`;

const Title = styled(Typography.Text)`
  flex: 1;
  color: ${theme.colors.accentSecondary};

  &&& {
    @media screen and (min-width: 1120px) {
      max-width: 120px;
    }
  }
`;

const CountButton = styled(Button)`
  background: ${theme.colors.bgDisable};
  border-color: transparent;
  color: ${theme.colors.neutralPrimary};
  font-weight: 700;
  font-size: 14px;
`;

const BasketButton = styled(Button)`
  color: ${theme.colors.accentPrimary};
`;

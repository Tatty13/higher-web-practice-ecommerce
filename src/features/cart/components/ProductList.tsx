import type { FC } from 'react';
import { List } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import type { CartItem } from '@/types';

import { ProductItem } from './ProductItem';

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
            <ProductItem
              product={product}
              quantity={quantity}
              decrementItem={() => decrementQuantity(productId)}
              incrementItem={() => incrementQuantity(productId)}
              removeItem={() => removeFromCart(productId)}
              isDisabledActions={isLoadingAction}
            />
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

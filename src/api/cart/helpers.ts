import type {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

import type { Cart, CartItem, Product } from '@/types';

import { helpersApi } from '../helpers';

export type BaseQuery = (
  arg: string | FetchArgs,
) => Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
>;

const BASE_URL = '/cart';

const calcCartTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    {
      totalItems: 0,
      totalPrice: 0,
    },
  );
};

const createEmptyCart = (userId: string): Cart => ({
  id: `cart-${userId}`,
  userId,
  items: [],
  totalPrice: 0,
  totalItems: 0,
});

const createCartItem = (product: Product): CartItem => {
  return {
    productId: product.id,
    product,
    quantity: 1,
    price: product.price,
  };
};

const buildCart = (items: CartItem[]): Omit<Cart, 'id' | 'userId'> => {
  return {
    items,
    ...calcCartTotals(items),
  };
};

const getUserCart = async (
  baseQuery: BaseQuery,
  userId: string,
): Promise<{ data: Cart | null } | { error: FetchBaseQueryError }> => {
  const result = await baseQuery({
    url: `${BASE_URL}?userId=${userId}`,
    method: 'GET',
  });

  if (helpersApi.isErrorResult(result) && result.error) {
    return { error: result.error };
  }

  const carts = result.data as Cart[];

  return {
    data: carts?.[0] ?? null,
  };
};

const createUserCart = async (
  baseQuery: BaseQuery,
  userId: string,
): Promise<{ data: Cart } | { error: FetchBaseQueryError }> => {
  const newCart = createEmptyCart(userId);

  const result = await baseQuery({
    url: BASE_URL,
    method: 'POST',
    body: newCart,
  });

  if (helpersApi.isErrorResult(result) && result.error) {
    return { error: result.error };
  }

  return {
    data: result.data as Cart,
  };
};

const getOrCreateUserCart = async (
  baseQuery: BaseQuery,
  userId: string,
): Promise<{ data: Cart } | { error: FetchBaseQueryError }> => {
  const cartResult = await getUserCart(baseQuery, userId);

  if ('error' in cartResult) {
    return cartResult;
  }

  if (cartResult.data) {
    return { data: cartResult.data };
  }

  return createUserCart(baseQuery, userId);
};

const saveCart = async (
  baseQuery: BaseQuery,
  cart: Cart,
  items: CartItem[],
): Promise<{ data: Cart } | { error: FetchBaseQueryError }> => {
  const updatedCart: Cart = {
    ...helpersCartApi.buildCart(items),
    id: cart.id,
    userId: cart.userId,
  };

  const result = await baseQuery({
    url: `${BASE_URL}/${cart.id}`,
    method: 'PUT',
    body: updatedCart,
  });

  if (helpersApi.isErrorResult(result) && result.error) {
    return { error: result.error };
  }

  return {
    data: result.data as Cart,
  };
};

const getProductById = async (
  baseQuery: BaseQuery,
  productId: string,
): Promise<{ data: Product } | { error: FetchBaseQueryError }> => {
  const result = await baseQuery({
    url: `/products/${productId}`,
    method: 'GET',
  });

  if (helpersApi.isErrorResult(result) && result.error) {
    return { error: result.error };
  }

  return {
    data: result.data as Product,
  };
};

const deleteCart = async (
  baseQuery: BaseQuery,
  userId: string,
): Promise<{ data: null } | { error: FetchBaseQueryError }> => {
  const cartResult = await getUserCart(baseQuery, userId);

  if ('error' in cartResult) {
    return cartResult;
  }

  const cart = cartResult.data;

  if (!cart) {
    return {
      data: null,
    };
  }

  const deleteResult = await baseQuery({
    url: `${BASE_URL}/${cart.id}`,
    method: 'DELETE',
  });

  if ('error' in deleteResult && deleteResult.error) {
    return { error: deleteResult.error };
  }

  return {
    data: null,
  };
};

export const helpersCartApi = {
  calcCartTotals,
  createEmptyCart,
  createCartItem,
  buildCart,
  getUserCart,
  getOrCreateUserCart,
  saveCart,
  getProductById,
  deleteCart,
};

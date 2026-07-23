import type { Cart, CartItem } from '@/types';
import utils from '@/utils';

import { baseApi } from '../baseApi';
import { helpersApi } from '../helpers';
import { helpersCartApi, type BaseQuery } from './helpers';

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart | null, void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        return helpersCartApi.getUserCart(baseQuery as BaseQuery, userId);
      },
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<Cart, string>({
      async queryFn(productId, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        const cartResult = await helpersCartApi.getOrCreateUserCart(
          baseQuery as BaseQuery,
          userId,
        );

        if ('error' in cartResult) {
          return cartResult;
        }

        const cart = cartResult.data;

        const existingItem = cart.items.find(
          (item) => item.productId === productId,
        );

        let updatedItems: CartItem[];

        if (existingItem) {
          updatedItems = cart.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          const productResult = await helpersCartApi.getProductById(
            baseQuery as BaseQuery,
            productId,
          );

          if ('error' in productResult) {
            return productResult;
          }

          const product = productResult.data;
          const newItem = helpersCartApi.createCartItem(product);

          updatedItems = [...cart.items, newItem];
        }

        return helpersCartApi.saveCart(
          baseQuery as BaseQuery,
          cart,
          updatedItems,
        );
      },
      invalidatesTags: ['Cart'],
    }),

    incrementCartItem: builder.mutation<Cart, { productId: string }>({
      async queryFn({ productId }, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        const cartResult = await helpersCartApi.getOrCreateUserCart(
          baseQuery as BaseQuery,
          userId,
        );

        if ('error' in cartResult) {
          return cartResult;
        }

        const cart = cartResult.data;

        const updatedItems = cart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );

        return helpersCartApi.saveCart(
          baseQuery as BaseQuery,
          cart,
          updatedItems,
        );
      },
      invalidatesTags: ['Cart'],
    }),

    decrementCartItem: builder.mutation<Cart, { productId: string }>({
      async queryFn({ productId }, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        const cartResult = await helpersCartApi.getOrCreateUserCart(
          baseQuery as BaseQuery,
          userId,
        );

        if ('error' in cartResult) {
          return cartResult;
        }

        const cart = cartResult.data;

        const updatedItems = cart.items
          .map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);

        return helpersCartApi.saveCart(
          baseQuery as BaseQuery,
          cart,
          updatedItems,
        );
      },
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<Cart, { productId: string }>({
      async queryFn({ productId }, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        const cartResult = await helpersCartApi.getOrCreateUserCart(
          baseQuery as BaseQuery,
          userId,
        );

        if ('error' in cartResult) {
          return cartResult;
        }

        const cart = cartResult.data;

        const updatedItems = cart.items.filter(
          (item) => item.productId !== productId,
        );

        return helpersCartApi.saveCart(
          baseQuery as BaseQuery,
          cart,
          updatedItems,
        );
      },
      invalidatesTags: ['Cart'],
    }),

    deleteCart: builder.mutation<null, void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const userId = utils.storage.getUserIdFromLocalStorage();

        if (!userId) {
          return helpersApi.getUnauthorizedError();
        }

        return helpersCartApi.deleteCart(baseQuery as BaseQuery, userId);
      },
      invalidatesTags: ['Cart'],
    }),
  }),
  overrideExisting: false,
});

const {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveCartItemMutation,
  useDeleteCartMutation,
} = cartApi;

export const methodsCartApi = {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveCartItemMutation,
  useDeleteCartMutation,
};

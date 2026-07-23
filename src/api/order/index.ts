import type { CreateOrderPayload, Order } from '@/types';

import { baseApi } from '../baseApi';
import { helpersOrderApi } from './helpers';
import utils from '@/utils';

const BASE_URL = '/orders';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderHistory: builder.query<Order[], void>({
      query: () => {
        const userId = utils.storage.getUserIdFromLocalStorage();

        return {
          url: BASE_URL,
          params: {
            userId,
          },
        };
      },
      providesTags: ['OrderHistory'],
    }),
    createOrder: builder.mutation<Order, CreateOrderPayload>({
      query: (payload) => {
        const order = helpersOrderApi.createOrderEntity(payload);

        return {
          url: BASE_URL,
          method: 'POST',
          body: order,
        };
      },
      invalidatesTags: ['OrderHistory'],
    }),
  }),
  overrideExisting: false,
});

const { useGetOrderHistoryQuery, useCreateOrderMutation } = orderApi;

export const methodsOrderApi = {
  useGetOrderHistoryQuery,
  useCreateOrderMutation,
};

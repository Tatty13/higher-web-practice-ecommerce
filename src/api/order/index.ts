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

    getOrderById: builder.query<Order, string | number>({
      query: (id) => {
        const userId = utils.storage.getUserIdFromLocalStorage();

        return {
          url: BASE_URL,
          params: {
            id,
            userId,
          },
        };
      },
      transformResponse: (response: Order[]) => response[0] ?? null,
      providesTags: (_result, _error, id) => [{ type: 'OrderHistory', id }],
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

const {
  useGetOrderHistoryQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
} = orderApi;

export const methodsOrderApi = {
  useGetOrderHistoryQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
};

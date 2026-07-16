import type { CreateOrderPayload, Order } from '@/types';

import { baseApi } from '../baseApi';
import { helpersOrderApi } from './helpers';

const BASE_URL = '/orders';

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderHistory: builder.query<Order[], void>({
      query: () => BASE_URL,
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
    getOrdersByUserId: builder.query<Order[], string>({
      query: (userId) => ({
        url: BASE_URL,
        params: {
          userId,
        },
      }),
      providesTags: ['OrderHistory'],
    }),
  }),
  overrideExisting: false,
});

const {
  useGetOrderHistoryQuery,
  useCreateOrderMutation,
  useGetOrdersByUserIdQuery,
} = orderApi;

export const methodsOrderApi = {
  useGetOrderHistoryQuery,
  useCreateOrderMutation,
  useGetOrdersByUserIdQuery,
};

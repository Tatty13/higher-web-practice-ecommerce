import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001',
  }),
  tagTypes: [
    'OrderHistory',
    'Cart',
    'PickupPoints',
    'City',
    'Catalog',
    'Ratings',
    'User',
  ],
  endpoints: () => ({}),
});

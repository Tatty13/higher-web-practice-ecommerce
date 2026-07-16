import type { Product, ProductRating } from '@/types';

import { baseApi } from '../baseApi';

const BASE_URL = '/products';
const RATINGS_URL = '/ratings';

const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string | void>({
      query: (search) => ({
        url: BASE_URL,
        params: search ? { q: search } : undefined,
      }),
      providesTags: ['Catalog'],
    }),
    getProductById: builder.query<Product, string>({
      query: (productId) => `${BASE_URL}/${productId}`,
      providesTags: (_result, _error, productId) => [
        { type: 'Catalog', id: productId },
      ],
    }),
    getRatingsByProductId: builder.query<ProductRating[], string>({
      query: (productId) => ({
        url: RATINGS_URL,
        params: {
          productId,
          _sort: 'createdAt',
          _order: 'desc',
        },
      }),
      providesTags: (_result, _error, productId) => [
        { type: 'Ratings', id: productId },
      ],
    }),
    addRating: builder.mutation<
      ProductRating,
      Omit<ProductRating, 'id' | 'createdAt'>
    >({
      query: (body) => ({
        url: RATINGS_URL,
        method: 'POST',
        body: {
          ...body,
          createdAt: new Date().toISOString(),
          id: crypto.randomUUID(),
        },
      }),
      invalidatesTags: (_result, _error, body) => [
        { type: 'Ratings', id: body.productId },
      ],
    }),
  }),
  overrideExisting: false,
});

const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRatingsByProductIdQuery,
  useAddRatingMutation,
} = catalogApi;

export const methodsCatalogApi = {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRatingsByProductIdQuery,
  useAddRatingMutation,
};

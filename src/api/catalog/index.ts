import type { Product, ProductRating } from '@/types';

import { baseApi } from '../baseApi';
import { helpersCatalogApi, type AddRatingPayload } from './helpers';

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
    addRating: builder.mutation<ProductRating, AddRatingPayload>({
      async queryFn(payload, _api, _extraOptions, baseQuery) {
        const ratingToCreate = helpersCatalogApi.createRatingEntity(payload);

        const createRatingResponse = await baseQuery({
          url: RATINGS_URL,
          method: 'POST',
          body: ratingToCreate,
        });

        if (createRatingResponse.error) {
          return { error: createRatingResponse.error };
        }

        const getRatingsResponse = await baseQuery({
          url: RATINGS_URL,
          params: {
            productId: payload.productId,
          },
        });

        if (getRatingsResponse.error) {
          return { error: getRatingsResponse.error };
        }

        const productRatings = getRatingsResponse.data as ProductRating[];
        const updatedRatingData =
          helpersCatalogApi.getProductRatingData(productRatings);

        const updateProductResponse = await baseQuery({
          url: `${BASE_URL}/${payload.productId}`,
          method: 'PATCH',
          body: updatedRatingData,
        });

        if (updateProductResponse.error) {
          return { error: updateProductResponse.error };
        }

        return { data: createRatingResponse.data as ProductRating };
      },

      invalidatesTags: (_result, _error, payload) => [
        { type: 'Ratings', id: payload.productId },
        { type: 'Catalog', id: payload.productId },
        'Catalog',
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

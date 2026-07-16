import type { City, CityOption, PickupPoint } from '@/types';

import { baseApi } from '../baseApi';

const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupPoints: builder.query<PickupPoint[], void>({
      query: () => '/pickupPoints',
      providesTags: ['PickupPoints'],
    }),
    getCities: builder.query<CityOption[], void>({
      query: () => '/cities',
      transformResponse: (response: City[]): CityOption[] =>
        response.map((city) => ({
          label: city.name,
          value: city.name,
        })),
      providesTags: ['City'],
    }),
  }),
  overrideExisting: false,
});

const { useGetPickupPointsQuery, useGetCitiesQuery } = locationApi;

export const methodsLocationApi = {
  useGetPickupPointsQuery,
  useGetCitiesQuery,
};

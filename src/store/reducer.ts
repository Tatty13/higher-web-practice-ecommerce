import { baseApi } from '@/api/baseApi';
import { reducerAuth } from '@/features/auth';

export const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: reducerAuth,
};

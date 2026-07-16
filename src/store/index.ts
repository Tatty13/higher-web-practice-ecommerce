import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';
import { baseApi } from '@/api/baseApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
export const useAppSelector = selectorHook.withTypes<RootState>();

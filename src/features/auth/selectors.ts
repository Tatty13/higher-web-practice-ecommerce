import type { RootState } from '@/store';

export const selectorsAuth = {
  userId: (state: RootState) => state.auth?.userId,
  isInitialized: (state: RootState) => state.auth?.isInitialized,
};

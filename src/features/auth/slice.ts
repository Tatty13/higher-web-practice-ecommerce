import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type StateAuth = {
  userId: string | null;
  isInitialized: boolean;
};

const initialState: StateAuth = {
  userId: null,
  isInitialized: false,
};

export const sliceAuth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, { payload }: PayloadAction<string | null>) => {
      state.userId = payload;
      state.isInitialized = true;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const actionsAuth = sliceAuth.actions;
export const reducerAuth = sliceAuth.reducer;

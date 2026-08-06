import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import utils from '@/utils';

const getUnauthorizedError = (): { error: FetchBaseQueryError } => {
  return {
    error: {
      status: 401,
      data: 'Пользователь не авторизован',
    },
  };
};

const getUserIdOrThrow = () => {
  const userId = utils.storage.getUserIdFromLocalStorage();
  if (!userId) {
    throw new Error('Пользователь не авторизован');
  }
  return userId;
};

type ApiError = {
  status: number;
  data?: {
    message?: string;
  };
};

const isApiError = (err: unknown): err is ApiError => {
  return typeof err === 'object' && err !== null && 'status' in err;
};

const isErrorResult = (result: unknown) =>
  result && typeof result === 'object' && 'error' in result;

export const helpersApi = {
  getUnauthorizedError,
  getUserIdOrThrow,
  isApiError,
  isErrorResult,
};

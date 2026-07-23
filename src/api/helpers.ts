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

export const helpersApi = {
  getUnauthorizedError,
  getUserIdOrThrow,
};

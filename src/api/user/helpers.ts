import type { RegisterPayload, User, UserProfile } from '@/types';

const removePassword = (user: User): UserProfile => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restData } = user;
  return restData;
};

const createNewUser = (data: RegisterPayload): User => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword, ...restData } = data;
  return {
    ...restData,
    id: crypto.randomUUID(),
    language: 'ru',
    notifyByEmail: false,
    createdAt: new Date().toISOString(),
  };
};

const transformResponse = (response: User) => removePassword(response);

export const helpersUserApi = {
  removePassword,
  createNewUser,
  transformResponse,
};

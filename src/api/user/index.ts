import type {
  ChangeUserLanguagePayload,
  ChangeUserNotificationPayload,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
  UserProfile,
} from '@/types';
import utils from '@/utils';

import { baseApi } from '../baseApi';
import { helpersUserApi } from './helpers';

const BASE_URL = '/users';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserProfile, string>({
      query: (userId) => ({
        url: `${BASE_URL}/${userId}`,
      }),
      transformResponse: helpersUserApi.transformResponse,
      providesTags: (_result, _error, userId) => [{ type: 'User', id: userId }],
    }),

    loginUser: builder.mutation<UserProfile | null, LoginPayload>({
      query: (params) => ({
        url: BASE_URL,
        params,
      }),
      transformResponse: (response: User[]) => {
        const user = response[0];
        return user ? helpersUserApi.removePassword(user) : null;
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.id) {
            utils.storage.saveUserIdLocalStorage(data.id);
          }
        } catch {
          utils.storage.removeUserIdFromLocalStorage();
        }
      },
    }),

    registerUser: builder.mutation<UserProfile, RegisterPayload>({
      async queryFn(arg, _api, _extraOptions, baseQuery) {
        const existingUsersResponse = await baseQuery({
          url: BASE_URL,
          params: { email: arg.email },
        });

        if (existingUsersResponse.error) {
          return { error: existingUsersResponse.error };
        }

        const existingUsers = existingUsersResponse.data as User[];

        if (existingUsers.length) {
          return {
            error: {
              status: 400,
              data: {
                message: 'Пользователь с таким email уже существует',
              },
            },
          };
        }

        const createUserResponse = await baseQuery({
          url: BASE_URL,
          method: 'POST',
          body: helpersUserApi.createNewUser(arg),
        });

        if (createUserResponse.error) {
          return { error: createUserResponse.error };
        }
        const user = createUserResponse.data as User;

        return {
          data: helpersUserApi.removePassword(user),
        };
      },
      invalidatesTags: ['User'],
    }),

    changeUserLanguage: builder.mutation<
      UserProfile,
      ChangeUserLanguagePayload
    >({
      query: ({ userId, language }) => ({
        url: `${BASE_URL}/${userId}`,
        method: 'PATCH',
        body: {
          language,
        },
      }),
      transformResponse: helpersUserApi.transformResponse,
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),

    changeUserNotification: builder.mutation<
      UserProfile,
      ChangeUserNotificationPayload
    >({
      query: ({ userId, notifyByEmail }) => ({
        url: `${BASE_URL}/${userId}`,
        method: 'PATCH',
        body: {
          notifyByEmail,
        },
      }),
      transformResponse: helpersUserApi.transformResponse,
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),

    updateUser: builder.mutation<UserProfile, UpdateProfilePayload>({
      query: ({ userId, data }) => ({
        url: `${BASE_URL}/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: helpersUserApi.transformResponse,
      invalidatesTags: (_result, _error, { userId }) => [
        { type: 'User', id: userId },
      ],
    }),
  }),
  overrideExisting: false,
});

const {
  useGetUserQuery,
  useLazyGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useChangeUserLanguageMutation,
  useChangeUserNotificationMutation,
  useUpdateUserMutation,
} = userApi;
const resetApiState = userApi.util.resetApiState;

export const methodsUserApi = {
  useGetUserQuery,
  useLazyGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useChangeUserLanguageMutation,
  useChangeUserNotificationMutation,
  useUpdateUserMutation,
  resetApiState,
};

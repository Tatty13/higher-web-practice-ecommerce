import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from '@/utils';

import { Login } from './Login';

const mockDispatch = jest.fn();
const mockNotificationError = jest.fn();
const mockLoginUser = jest.fn();
const mockGetUser = jest.fn();

jest.mock('@/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('@/app/paths', () => ({
  ROUTE_PATHS: {
    registration: '/registration',
    login: '/login',
    main: '/main',
  },
}));

jest.mock('@/api', () => ({
  api: {
    user: {
      useLoginUserMutation: () => [
        mockLoginUser,
        {
          isLoading: false,
          isError: false,
        },
      ],
      useLazyGetUserQuery: () => [
        mockGetUser,
        {
          isLoading: false,
        },
      ],
    },
  },
}));

jest.mock('antd', () => {
  const actual = jest.requireActual('antd');
  return {
    ...actual,
    notification: {
      ...actual.notification,
      useNotification: () => [
        {
          error: mockNotificationError,
        },
        <div key='notification-holder' />,
      ],
    },
  };
});

jest.mock('./../slice', () => {
  const actual = jest.requireActual('./../slice');
  return {
    ...actual,
    actionsAuth: {
      ...actual.actionsAuth,
      setUserId: (id: string) => ({
        type: 'auth/setUserId',
        payload: id,
      }),
    },
  };
});

jest.mock('./Auth', () => ({
  Auth: ({
    children,
    onSubmit,
  }: {
    children: React.ReactNode;
    onSubmit: () => void;
  }) => (
    <div>
      {children}
      <button
        onClick={onSubmit}
        type='button'>
        submit
      </button>
    </div>
  ),
}));

const emailFieldName = /ваш email/i;
const passwordFieldName = /пароль/i;
const submitBtnName = /submit/i;

describe('Интеграционный тест Логина', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Успешный логин переводит пользователя на главную страницу', async () => {
    const user = userEvent.setup();

    mockLoginUser.mockReturnValueOnce({
      data: {
        id: 'user-42',
        email: 'test@test.ru',
      },
    });

    mockGetUser.mockResolvedValueOnce({
      data: {
        id: 'user-42',
      },
    });

    utils.mock.renderAuthApp({
      initialRoute: '/login',
      registrationElement: <div>Registration page</div>,
      loginElement: <Login />,
      mainElement: <div>Main page</div>,
    });

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123!');
    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(screen.getByText('Main page')).toBeInTheDocument();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'auth/setUserId',
      payload: 'user-42',
    });
    expect(mockNotificationError).not.toHaveBeenCalled();
  });

  it('При ошибке логина не переводит пользователя на главную страницу', async () => {
    const user = userEvent.setup();

    mockLoginUser.mockReturnValueOnce({
      error: { message: 'Проверьте email или пароль' },
    });

    utils.mock.renderAuthApp({
      initialRoute: '/login',
      registrationElement: <div>Registration page</div>,
      loginElement: <Login />,
      mainElement: <div>Main page</div>,
    });

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(
      screen.getByLabelText(passwordFieldName),
      'Wrong-password-1',
    );
    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalled();
    });

    expect(screen.queryByText('Main page')).not.toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from '@/utils';

import { Registration } from './Registration';

const mockRegisterUser = jest.fn();
const mockNotificationError = jest.fn();

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
      useRegisterUserMutation: () => [
        mockRegisterUser,
        {
          isLoading: false,
          isError: false,
          error: null,
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

const firstNameFieldName = /имя/i;
const lastNameFieldName = /фамилия/i;
const emailFieldName = /email/i;
const passwordFieldName = /придумайте пароль/i;
const confirmPasswordFieldName = /повторите пароль/i;
const submitBtnName = /submit/i;

describe('Интеграционный тест Регистрации', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Успешная регистрация переводит пользователя на страницу логина', async () => {
    const user = userEvent.setup();

    mockRegisterUser.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValue({
        id: 'user-1',
        email: 'test@test.ru',
      }),
    });

    utils.test.renderAuthApp({
      initialRoute: '/registration',
      registrationElement: <Registration />,
      loginElement: <div>Login page</div>,
      mainElement: <div>Main page</div>,
    });

    await user.type(screen.getByLabelText(firstNameFieldName), 'Тест');
    await user.type(screen.getByLabelText(lastNameFieldName), 'Тестов');
    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123!');
    await user.type(
      screen.getByLabelText(confirmPasswordFieldName),
      'Password123!',
    );

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(screen.getByText('Login page')).toBeInTheDocument();
    });

    expect(mockNotificationError).not.toHaveBeenCalled();
  });

  it('При ошибке регистрации не переводит пользователя на страницу логина', async () => {
    const user = userEvent.setup();

    mockRegisterUser.mockReturnValueOnce({
      unwrap: jest
        .fn()
        .mockRejectedValue(new Error('Пользователь уже существует')),
    });

    utils.test.renderAuthApp({
      initialRoute: '/registration',
      registrationElement: <Registration />,
      loginElement: <div>Login page</div>,
      mainElement: <div>Main page</div>,
    });

    await user.type(screen.getByLabelText(firstNameFieldName), 'Тест');
    await user.type(screen.getByLabelText(lastNameFieldName), 'Тестов');
    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123!');
    await user.type(
      screen.getByLabelText(confirmPasswordFieldName),
      'Password123!',
    );

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalled();
    });

    expect(screen.queryByText('Login page')).not.toBeInTheDocument();
  });
});

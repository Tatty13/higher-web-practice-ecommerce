import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from '@/utils';

import { actionsAuth } from './../slice';
import { Login } from './Login';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockNotificationError = jest.fn();
const mockLoginUser = jest.fn();
const mockGetUser = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

jest.mock('@/store', () => ({
  useAppDispatch: () => mockDispatch,
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

describe('Логин', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Успешно логинит пользователя, получает профиль, диспатчит userId и делает navigate', async () => {
    const user = userEvent.setup();

    mockLoginUser.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValue({
        id: 'user-123',
        email: 'test@test.ru',
      }),
    });

    mockGetUser.mockResolvedValueOnce({
      data: {
        id: 'user-123',
      },
    });

    utils.test.renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123');
    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: 'test@test.ru',
        password: 'Password123',
      });
    });

    await waitFor(() => {
      expect(mockGetUser).toHaveBeenCalled();
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      actionsAuth.setUserId('user-123'),
    );
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('Показывает нотификацию, если логин вернул null', async () => {
    const user = userEvent.setup();

    mockLoginUser.mockReturnValueOnce({
      unwrap: jest.fn().mockResolvedValue(null),
    });

    expect(() => {
      utils.test.renderWithProviders(<Login />);
    }).not.toThrow();

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123');
    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Ошибка авторизации',
          description: 'Проверьте email или пароль',
        }),
      );
    });

    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Показывает нотификацию, если loginUser.unwrap() пробросил ошибку', async () => {
    const user = userEvent.setup();

    mockLoginUser.mockReturnValueOnce({
      unwrap: jest.fn().mockRejectedValue(new Error('')),
    });

    utils.test.renderWithProviders(<Login />);

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'WrongPassword');
    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Ошибка авторизации',
          description: '',
        }),
      );
    });

    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Показывает ошибку, если обязательные поля не заполнены', async () => {
    const user = userEvent.setup();

    utils.test.renderWithProviders(<Login />);

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      const errorMessages = screen.queryAllByText(
        utils.validation.VALIDATION_MESSAGES.required,
      );

      expect(errorMessages).toHaveLength(2);
    });

    expect(mockGetUser).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import utils from '@/utils';

import { Registration } from './Registration';

const mockNavigate = jest.fn();
const mockRegisterUser = jest.fn();
const mockNotificationError = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

describe('Регистрация', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Показывает ошибку, если пароль не соответствует требованиям, не вызывает registerUser', async () => {
    const user = userEvent.setup();

    utils.test.renderWithProviders(<Registration />);

    await user.type(screen.getByLabelText(firstNameFieldName), 'Тест');
    await user.type(screen.getByLabelText(lastNameFieldName), 'Тестов');
    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123');

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      const errorElement = screen.queryByText(
        utils.validation.VALIDATION_MESSAGES.password,
      );
      expect(errorElement).toBeInTheDocument();
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Показывает ошибку, если пароли не совпадают, не вызывает registerUser', async () => {
    const user = userEvent.setup();

    utils.test.renderWithProviders(<Registration />);

    await user.type(screen.getByLabelText(firstNameFieldName), 'Тест');
    await user.type(screen.getByLabelText(lastNameFieldName), 'Тестов');
    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'Password123!');
    await user.type(
      screen.getByLabelText(confirmPasswordFieldName),
      'Password321!',
    );

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      expect(mockNotificationError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Ошибка регистрации',
          description: 'Пароли не совпадают',
        }),
      );
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Показывает ошибку, если email невалидный, не вызывает registerUser', async () => {
    const user = userEvent.setup();

    utils.test.renderWithProviders(<Registration />);

    await user.type(screen.getByLabelText(firstNameFieldName), 'Тест');
    await user.type(screen.getByLabelText(lastNameFieldName), 'Тестов');
    await user.type(screen.getByLabelText(emailFieldName), 'invalid-email@email');
    await user.type(screen.getByLabelText(passwordFieldName), 'ValidPass123!');
    await user.type(
      screen.getByLabelText(confirmPasswordFieldName),
      'ValidPass123!',
    );

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      const errorElement = screen.queryByText(
        utils.validation.VALIDATION_MESSAGES.pattern,
      );
      expect(errorElement).toBeInTheDocument();
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Показывает ошибку, если обязательные поля не заполнены', async () => {
    const user = userEvent.setup();

    utils.test.renderWithProviders(<Registration />);

    await user.type(screen.getByLabelText(emailFieldName), 'test@test.ru');
    await user.type(screen.getByLabelText(passwordFieldName), 'ValidPass123!');
    await user.type(
      screen.getByLabelText(confirmPasswordFieldName),
      'ValidPass123!',
    );

    await user.click(screen.getByRole('button', { name: submitBtnName }));

    await waitFor(() => {
      const errorMessages = screen.queryAllByText(
        utils.validation.VALIDATION_MESSAGES.required,
      );

      expect(errorMessages).toHaveLength(2);
    });

    expect(mockRegisterUser).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('Успешно регистрирует пользователя и выполняет navigate на страницу логина', async () => {
    const user = userEvent.setup();

    const unwrap = jest.fn().mockResolvedValue({
      id: 'user-1',
      firstName: 'Тест',
      lastName: 'Тестов',
      email: 'test@test.ru',
    });

    mockRegisterUser.mockReturnValueOnce({ unwrap });

    utils.test.renderWithProviders(<Registration />);

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
      expect(mockRegisterUser).toHaveBeenCalledWith({
        firstName: 'Тест',
        lastName: 'Тестов',
        email: 'test@test.ru',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});

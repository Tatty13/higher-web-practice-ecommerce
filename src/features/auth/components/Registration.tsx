import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Form, Input, notification, type FormProps } from 'antd';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import utils from '@/utils';

import { Auth } from './Auth';
import { helpersApi } from '@/api/helpers';

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Registration: FC = () => {
  const [form] = Form.useForm<Fields>();
  const [notificationApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const [registerUser, { isLoading }] = api.user.useRegisterUserMutation();

  const onFinish: FormProps<Fields>['onFinish'] = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      await registerUser(values).unwrap();

      navigate(ROUTE_PATHS.login);
    } catch (err) {
      let description: string | undefined;

      if (err instanceof Error) {
        description = err.message;
      }

      if (helpersApi.isApiError(err)) {
        description = err.data?.message;
      }

      notificationApi.error({
        message: 'Ошибка регистрации',
        description: description || 'Не удалось зарегистрировать пользователя',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Auth
        title='Регистрация'
        submitBtnText='Зарегистрироваться'
        additionalInfoTitle='Уже зарегистрированы?'
        redirectLinkTitle='Войти в аккаунт'
        redirectLinkPath={ROUTE_PATHS.login}
        isLoading={isLoading}
        onSubmit={form.submit}>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}>
          <Flex vertical>
            <Form.Item
              name='firstName'
              label='Имя'
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input
                placeholder='Ярополк'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='lastName'
              label='Фамилия'
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input
                placeholder='Иванов'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                utils.validation.VALIDATION_RULES.required,
                utils.validation.VALIDATION_RULES.email,
              ]}>
              <Input
                placeholder='ivanov@yandex.ru'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='password'
              label='Придумайте пароль'
              rules={[
                utils.validation.VALIDATION_RULES.required,
                utils.validation.VALIDATION_RULES.password,
              ]}>
              <Input
                type='password'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='confirmPassword'
              label='Повторите пароль'
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input
                type='password'
                size='large'
              />
            </Form.Item>
          </Flex>
        </Form>
      </Auth>
    </>
  );
};

import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Form,
  Input,
  notification,
  Typography,
  type FormProps,
} from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { useAppDispatch } from '@/store';
import utils from '@/utils';

import { Auth } from './Auth';
import { actionsAuth } from '../slice';

type Fields = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const [form] = Form.useForm<Fields>();
  const [notificationApi, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginUser, { isLoading }] = api.user.useLoginUserMutation();
  const [getUser, { isLoading: isLoadingGetUser }] =
    api.user.useLazyGetUserQuery();

  const onFinish: FormProps<Fields>['onFinish'] = async (values) => {
    try {
      const result = await loginUser(values);
      const user = result.data;

      if (result.error || !user) {
        throw new Error('Проверьте email или пароль');
      }

      await getUser();

      dispatch(actionsAuth.setUserId(user.id));
      navigate(ROUTE_PATHS.main);
    } catch (err) {
      notificationApi.error({
        message: 'Ошибка авторизации',
        description: (err instanceof Error && err?.message) || '',
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Auth
        title='Вход в аккаунт'
        submitBtnText='Войти'
        additionalInfoTitle='У вас ещё нет аккаунта?'
        redirectLinkTitle='Зарегистрироваться'
        redirectLinkPath={ROUTE_PATHS.registration}
        isLoading={isLoading || isLoadingGetUser}
        onSubmit={form.submit}>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}>
          <Flex vertical>
            <Form.Item
              name='email'
              label='Ваш email'
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
              label='Пароль'
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input
                type='password'
                size='large'
              />
            </Form.Item>
            <PasswordTip type='secondary'>Забыли пароль?</PasswordTip>
          </Flex>
        </Form>
      </Auth>
    </>
  );
};

const PasswordTip = styled(Typography.Link)`
  text-align: end;
`;

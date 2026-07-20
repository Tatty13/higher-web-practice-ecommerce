import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Typography,
  type FormProps,
} from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { selectorsAuth } from '@/features/auth';
import { useAppSelector } from '@/store';
import { tokens } from '@/theme/tokens';
import { AvatarUpload, Card, Loader } from '@/uiKit';
import utils from '@/utils';

import { helpersProfile } from '../helpers';

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
};

export const ProfileEdit: FC = () => {
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  const userId = useAppSelector(selectorsAuth.userId);

  const [form] = Form.useForm<Fields>();

  const {
    data: user,
    isLoading: isLoadingGetUser,
    refetch: refetchGetUser,
  } = api.user.useGetUserQuery(userId ?? skipToken);

  const [
    updateUser,
    { isLoading: isLoadingUpdateUser, isError: isErrorUpdateUser },
  ] = api.user.useUpdateUserMutation();

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
  };

  const cancelEdit = () => {
    navigate(ROUTE_PATHS.profile);
  };

  const handleUpdateUser: FormProps<Fields>['onFinish'] = async (values) => {
    try {
      const isFieldsChanged = helpersProfile.checkIsFieldsChanged(
        initialValues,
        values,
      );

      if (!isFieldsChanged) {
        notificationApi.info({
          message: 'Данные не изменены',
        });
        return;
      }

      await updateUser({
        userId: user!.id,
        data: values,
      });

      if (isErrorUpdateUser) {
        throw new Error();
      }

      navigate(ROUTE_PATHS.profile);
    } catch {
      notificationApi.error({
        message: 'Произошла ошибка при обновлении данных',
        description: 'Данные пользователя не обновлены',
      });
    }
  };

  if (isLoadingGetUser) {
    return <Loader description='Загружаем данные пользователя' />;
  }

  if (!isLoadingGetUser && !user) {
    return (
      <Flex
        vertical
        gap='large'
        align='center'>
        <Typography.Title level={2}>
          Не удалось загрузить данные пользователя
        </Typography.Title>
        <Button
          type='primary'
          onClick={refetchGetUser}>
          Повторить
        </Button>
      </Flex>
    );
  }

  return (
    <Content
      vertical
      gap='large'>
      {contextHolder}

      <AvatarUpload />

      <Form
        form={form}
        layout='vertical'
        initialValues={initialValues}
        onFinish={handleUpdateUser}>
        <Row gutter={16}>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}>
            <Form.Item
              name='firstName'
              label='Имя:'
              required={false}
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}>
            <Form.Item
              name='lastName'
              label='Фамилия:'
              required={false}
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '50%' }}>
            <Form.Item
              name='email'
              label='Email:'
              required={false}
              rules={[utils.validation.VALIDATION_RULES.required]}>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Controls gap='small'>
        <Button
          size='large'
          onClick={cancelEdit}>
          Отменить
        </Button>
        <Button
          type='primary'
          size='large'
          disabled={isLoadingUpdateUser}
          onClick={form.submit}>
          Сохранить
        </Button>
      </Controls>
    </Content>
  );
};

const Content = styled(Card)`
  @media screen and (${tokens.app.mediaMobileWidthS}) {
    align-items: center;
  }
`;

const Controls = styled(Flex)`
  @media screen and (${tokens.app.mediaMobileWidthS}) {
    flex-direction: column;
    width: 100%;
  }
`;

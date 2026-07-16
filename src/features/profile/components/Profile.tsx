import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  notification,
  Select,
  Typography,
  type CheckboxProps,
  type SelectProps,
} from 'antd';
import styled from 'styled-components';

import { UserIcon } from '@/assets';
import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { selectorsAuth } from '@/features/auth';
import { actionsAuth } from '@/features/auth/slice';
import { useAppDispatch, useAppSelector } from '@/store';
import { Card } from '@/uiKit';
import utils from '@/utils';

const langOptions: SelectProps['options'] = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'English',
  },
];

export const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [notificationApi, contextHolder] = notification.useNotification();

  const userId = useAppSelector(selectorsAuth.userId);

  const { data: user, isLoading: isLoadingGetUser } = api.user.useGetUserQuery(
    userId ?? skipToken,
  );

  const [
    changeUserLanguage,
    {
      isLoading: isLoadingChangeUserLanguage,
      isError: isErrorChangeUserLanguage,
    },
  ] = api.user.useChangeUserLanguageMutation();

  const [
    changeUserNotification,
    {
      isLoading: isLoadingChangeUserNotification,
      isError: isErrorChangeUserNotification,
    },
  ] = api.user.useChangeUserNotificationMutation();

  const editProfile = () => {
    navigate(ROUTE_PATHS.profileEdit);
  };

  const handleChangeLang: SelectProps['onChange'] = async (language) => {
    try {
      if (!userId) return;

      await changeUserLanguage({
        userId,
        language,
      });

      if (isErrorChangeUserLanguage) {
        throw new Error();
      }
    } catch {
      notificationApi.error({
        message: 'Произошла ошибка при изменении языка',
      });
    }
  };

  const handleChangeNotification: CheckboxProps['onChange'] = async (evt) => {
    try {
      if (!userId) return;

      await changeUserNotification({
        userId,
        notifyByEmail: evt.target.checked,
      });

      if (isErrorChangeUserNotification) {
        throw new Error();
      }
    } catch {
      notificationApi.error({
        message: 'Произошла ошибка при изменении согласия на уведомления',
      });
    }
  };

  const handleLogout = () => {
    utils.storage.removeUserIdFromLocalStorage();
    dispatch(actionsAuth.logout());
    dispatch(api.user.resetApiState());
    navigate(ROUTE_PATHS.login);
  };

  return (
    <>
      {contextHolder}
      <Card
        gap='middle'
        align='center'
        justify='space-between'>
        <Flex
          align='center'
          gap='middle'>
          <Avatar
            size={80}
            icon={<UserIcon />}
          />
          <Flex
            vertical
            gap='small'>
            <Typography.Text>{user?.firstName}</Typography.Text>
            <Typography.Text>{user?.email}</Typography.Text>
          </Flex>
        </Flex>
        <Button
          size='large'
          disabled={isLoadingGetUser}
          onClick={editProfile}>
          Редактировать
        </Button>
      </Card>

      <Flex vertical>
        <Typography.Text type='secondary'>Язык:</Typography.Text>
        <Select
          options={langOptions}
          value={user?.language}
          onChange={handleChangeLang}
          loading={isLoadingChangeUserLanguage}
          size='large'
          style={{ width: '180px' }}
        />
      </Flex>

      <Checkbox
        checked={user?.notifyByEmail}
        disabled={isLoadingChangeUserNotification}
        onChange={handleChangeNotification}>
        Уведомлять об изменении статуса заказов по email
      </Checkbox>

      <LogoutButton
        disabled={isLoadingGetUser}
        onClick={handleLogout}>
        Выйти
      </LogoutButton>
    </>
  );
};

const LogoutButton = styled(Button)`
  align-self: flex-end;
`;

import { type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { helpersApi } from '@/api/helpers';
import { ROUTE_PATHS } from '@/app/paths';
import { actionsAuth } from '@/features/auth/slice';
import { useAppDispatch } from '@/store';
import { tokens } from '@/theme/tokens';
import { Card, Text } from '@/uiKit';
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

  const { isMobile } = utils.responsive.useResponsive();

  const { data: user, isLoading: isLoadingGetUser } =
    api.user.useGetUserQuery();

  const [changeUserLanguage, { isLoading: isLoadingChangeUserLanguage }] =
    api.user.useChangeUserLanguageMutation();

  const [
    changeUserNotification,
    { isLoading: isLoadingChangeUserNotification },
  ] = api.user.useChangeUserNotificationMutation();

  const editProfile = () => {
    navigate(ROUTE_PATHS.profileEdit);
  };

  const handleChangeLang: SelectProps['onChange'] = async (language) => {
    try {
      const result = await changeUserLanguage({
        language,
      });

      if (helpersApi.isErrorResult(result)) {
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
      const result = await changeUserNotification({
        notifyByEmail: evt.target.checked,
      });

      if (helpersApi.isErrorResult(result)) {
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
      <MainContent
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
        <EditButton
          size='large'
          disabled={isLoadingGetUser}
          onClick={editProfile}>
          Редактировать
        </EditButton>
      </MainContent>

      <Flex vertical>
        <Typography.Text type='secondary'>Язык:</Typography.Text>
        <StylesSelect
          options={langOptions}
          value={user?.language}
          onChange={handleChangeLang}
          loading={isLoadingChangeUserLanguage}
          size='large'
        />
      </Flex>

      <Checkbox
        checked={user?.notifyByEmail}
        disabled={isLoadingChangeUserNotification}
        onChange={handleChangeNotification}>
        Уведомлять об изменении статуса заказов по email
      </Checkbox>

      {isMobile && (
        <Link to={ROUTE_PATHS.orderHistory}>
          <Text
            size={14}
            color={tokens.colors.accentSecondary}>
            История заказов
          </Text>
        </Link>
      )}

      <LogoutButton
        disabled={isLoadingGetUser}
        onClick={handleLogout}>
        Выйти
      </LogoutButton>
    </>
  );
};

const MainContent = styled(Card)`
  @media screen and (${tokens.app.mediaMobileWidthS}) {
    flex-direction: column;
    align-items: start;
    gap: 24px;
  }
`;

const EditButton = styled(Button)`
  @media screen and (${tokens.app.mediaMobileWidthS}) {
    width: 100%;
  }
`;

const StylesSelect = styled(Select)`
  width: 180px;

  @media screen and (${tokens.app.mediaMobileWidthS}) {
    width: 100%;
  }
`;

const LogoutButton = styled(Button)`
  align-self: flex-end;
`;

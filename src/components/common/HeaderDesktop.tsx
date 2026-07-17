import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, Flex } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { UserIcon, CartIcon } from '@/assets';
import { Logo, LinkWithIcon } from '@/uiKit';
import { theme } from '@/theme/styledTheme';
import { useAppSelector } from '@/store';
import { selectorsAuth } from '@/features/auth';

import { Search } from './Search';

export const HeaderDesktop: FC = () => {
  const userId = useAppSelector(selectorsAuth.userId);

  const { currentData: user } = api.user.useGetUserQuery(userId ?? skipToken);

  return (
    <StyledHeader>
      <Flex
        gap='middle'
        align='center'>
        <Logo />
        <Link to={ROUTE_PATHS.main}>
          <Button
            type='primary'
            size='large'>
            Каталог
          </Button>
        </Link>
      </Flex>
      <Search />

      <Flex
        gap='middle'
        align='center'>
        {user ? (
          <>
            <LinkWithIcon
              title={`${user.firstName} ${user.lastName}`}
              Icon={UserIcon}
              to={ROUTE_PATHS.profile}
            />
            <LinkWithIcon
              title='Корзина'
              Icon={CartIcon}
              to={`${ROUTE_PATHS.cart}`}
            />
          </>
        ) : (
          <>
            <LinkWithIcon
              title='Войти'
              Icon={UserIcon}
              to={`${ROUTE_PATHS.login}`}
            />

            <Link to={ROUTE_PATHS.registration}>
              <Button
                type='primary'
                size='large'>
                Зарегистрироваться
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 12px ${theme.app.sidePaddingsDesktop};
  max-width: ${theme.app.maxwidth};
  margin: 0 auto;
`;

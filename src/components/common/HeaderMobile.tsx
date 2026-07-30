import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { UserIcon, CartIcon, HomeIcon, MenuIcon } from '@/assets';
import { LinkWithIcon } from '@/uiKit';
import { theme } from '@/theme/styledTheme';

export const HeaderMobile: FC = () => {
  const { currentData: user } = api.user.useGetUserQuery();

  return (
    <StyledHeader>
      {user ? (
        <>
          <LinkWithIcon
            title='Главная'
            Icon={HomeIcon}
            iconSize={18}
            to={ROUTE_PATHS.main}
            withActiveStyle
          />
          <LinkWithIcon
            title='Товары'
            Icon={MenuIcon}
            iconSize={18}
            to={ROUTE_PATHS.catalog}
            withActiveStyle
          />
          <LinkWithIcon
            title='Профиль'
            Icon={UserIcon}
            iconSize={18}
            to={ROUTE_PATHS.profile}
            withActiveStyle
          />
          <LinkWithIcon
            title='Корзина'
            Icon={CartIcon}
            iconSize={18}
            to={`${ROUTE_PATHS.cart}`}
            withActiveStyle
          />
        </>
      ) : (
        <>
          <LinkWithIcon
            title='Войти'
            Icon={UserIcon}
            to={`${ROUTE_PATHS.login}`}
          />

          <Link
            to={ROUTE_PATHS.registration}
            style={{ flex: 1 }}>
            <Button
              type='primary'
              size='large'
              style={{ width: '100%' }}>
              Зарегистрироваться
            </Button>
          </Link>
        </>
      )}
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

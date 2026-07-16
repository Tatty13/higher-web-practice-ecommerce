import { type FC } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Flex, Menu } from 'antd';
import styled from 'styled-components';

import { ROUTE_PATHS } from '@/app/paths';

const menuItems = [
  { key: '1', label: 'Мой профиль', to: ROUTE_PATHS.profile },
  { key: '2', label: 'История заказов', to: ROUTE_PATHS.orderHistory },
  { key: '3', label: 'Корзина', to: ROUTE_PATHS.cart },
];

export const AccountLayout: FC = () => {
  const location = useLocation();

  const currentMenuItem = menuItems.find((item) =>
    location.pathname.endsWith(item.to),
  );

  return (
    <Flex
      gap='middle'
      style={{ flex: 1 }}>
      <StyledMenu selectedKeys={[currentMenuItem?.key?.toString() || '1']}>
        {menuItems.map((item) => {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          );
        })}
      </StyledMenu>

      <Content vertical>
        <Outlet />
      </Content>
    </Flex>
  );
};

const Content = styled(Flex)`
  height: 100%;
  flex: 1;
`;

const StyledMenu = styled(Menu)`
  width: 280px;
  height: 100%;
  background: inherit;
  padding-right: 16px;

  @media screen and (max-width: 1240px) {
    max-width: 190px;
  }
`;

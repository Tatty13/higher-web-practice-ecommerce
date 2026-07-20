import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import utils from '@/utils';

import { AccountLayoutDesktop } from './AccountLayoutDesktop';

export const AccountLayout: FC = () => {
  const { isMobile } = utils.responsive.useResponsive();

  return isMobile ? <Outlet /> : <AccountLayoutDesktop />;
};

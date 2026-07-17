import { Outlet } from 'react-router-dom';

import utils from '@/utils';

import { DesktopLayout } from './MainLayout/DesktopLayout';

export function AuthLayout() {
  const { isMobile } = utils.responsive.useResponsive();

  return isMobile ? <Outlet /> : <DesktopLayout />;
}

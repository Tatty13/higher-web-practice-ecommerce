import type { FC, PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from '@/app/paths';
import utils from '@/utils';

export const MobileOnlyRoute: FC<PropsWithChildren> = () => {
  const { isMobile } = utils.responsive.useResponsive();

  if (!isMobile) {
    return (
      <Navigate
        to={ROUTE_PATHS.main}
        replace
      />
    );
  }

  return <Outlet />;
};

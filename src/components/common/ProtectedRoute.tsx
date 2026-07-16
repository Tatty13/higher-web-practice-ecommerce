import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_PATHS } from '@/app/paths';
import { useAppSelector } from '@/store';
import { selectorsAuth } from '@/features/auth';
import { Loader } from '@/uiKit';

export const ProtectedRoute: FC = () => {
  const userId = useAppSelector(selectorsAuth.userId);
  const isInitialized = useAppSelector(selectorsAuth.isInitialized);

  if (!isInitialized) {
    return <Loader />;
  }

  if (!userId) {
    return (
      <Navigate
        to={ROUTE_PATHS.login}
        replace
      />
    );
  }

  return <Outlet />;
};

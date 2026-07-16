import { useEffect, type FC } from 'react';

import utils from '@/utils';
import { useAppDispatch } from '@/store';

import { actionsAuth } from '../slice';

export const AuthInitializer: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = utils.storage.getUserIdFromLocalStorage();
    dispatch(actionsAuth.setUserId(userId));
  }, [dispatch]);

  return null;
};

import type { FC } from 'react';

import utils from '@/utils';

import { AuthLayoutMobile } from './AuthLayoutMobile';
import { AuthLayoutDesktop } from './AuthLayoutDesktop';
import type { AuthLayoutProps } from '../types';

export const Auth: FC<AuthLayoutProps> = (props) => {
  const { isMobile } = utils.responsive.useResponsive();

  if (isMobile) {
    return <AuthLayoutMobile {...props} />;
  }

  return <AuthLayoutDesktop {...props} />;
};

import type { FC } from 'react';

import { Catalog, CatalogMobileMain } from '@/features/catalog';
import utils from '@/utils';

export const MainPage: FC = () => {
  const { isMobile } = utils.responsive.useResponsive();

  return isMobile ? <CatalogMobileMain /> : <Catalog />;
};

import type { FC } from 'react';

import { CatalogNavList } from '@/features/catalog';
import { helpersCatalog } from '@/features/catalog/helpers';

export const CatalogPage: FC = () => {
  return (
    <CatalogNavList
      items={[
        {
          label: helpersCatalog.catalogTree.title,
          to: helpersCatalog.catalogTree.pathTo,
        },
      ]}
    />
  );
};

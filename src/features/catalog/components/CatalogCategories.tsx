import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTE_PATHS } from '@/app/paths';

import { helpersCatalog } from '../helpers';
import type { CatalogNavListItem } from '../type';
import { CatalogNavList } from './CatalogNavList';
import { CatalogMobileTitle } from './CatalogMobileTitle';

const items: CatalogNavListItem[] = helpersCatalog.catalogTree.categories.map(
  (category) => ({
    label: category.title,
    to: `${ROUTE_PATHS.catalog}/${category.title}`,
  }),
);

export const CatalogCategories: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <CatalogMobileTitle
        title={helpersCatalog.catalogTree.title}
        goBack={() => navigate(ROUTE_PATHS.catalog)}
      />
      <CatalogNavList items={items} />
    </>
  );
};

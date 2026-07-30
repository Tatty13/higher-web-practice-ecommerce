import type { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTE_PATHS } from '@/app/paths';

import { helpersCatalog } from '../helpers';
import type { CatalogNavListItem } from '../type';
import { CatalogNavList } from './CatalogNavList';
import { CatalogMobileTitle } from './CatalogMobileTitle';

export const CatalogCategory: FC = () => {
  const navigate = useNavigate();
  const { category = '' } = useParams();
  const { pathname } = useLocation();

  const items: CatalogNavListItem[] =
    helpersCatalog.catalogTree.categories
      .find((item) => item.title === category)
      ?.subCategories?.map((subCategory) => ({
        label: subCategory,
        to: `${pathname}/${subCategory}`,
      })) || [];

  return (
    <>
      <CatalogMobileTitle
        title={category}
        goBack={() => navigate(ROUTE_PATHS.catalogCategories)}
      />
      <CatalogNavList items={items} />
    </>
  );
};

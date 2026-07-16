import type { FC } from 'react';
import { List } from 'antd';

import { ROUTE_PATHS } from '@/app/paths';
import utils from '@/utils';
import type { Product, ProductView } from '@/types';

import { helpersCatalog } from '../helpers';
import { CatalogItem } from './CatalogItem';

type CatalogListProps = {
  view: ProductView | undefined;
  items: Product[];
  currentProductId?: string;
  isLoadingAddToCart: boolean;
  isErrorAddToCart: boolean;
  handleAddToCart: (productId: string) => void;
};

export const CatalogList: FC<CatalogListProps> = ({
  view,
  items,
  currentProductId,
  isLoadingAddToCart,
  isErrorAddToCart,
  handleAddToCart,
}) => {
  const isListView = view === 'list';

  return (
    <List
      dataSource={items}
      pagination={{
        position: 'bottom',
        align: 'start',
        defaultPageSize: helpersCatalog.DEFAULT_PAGE_PRODUCTS_COUNT,
      }}
      rowKey='id'
      split={isListView}
      locale={{
        emptyText: 'Товары не найдены',
      }}
      style={{ width: '100%' }}
      grid={
        !isListView
          ? {
              gutter: 16,
              xxl: 4,
              xl: 4,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }
          : undefined
      }
      renderItem={(product) => {
        const isError = currentProductId === product.id && isErrorAddToCart;
        const isLoading = currentProductId === product.id && isLoadingAddToCart;
        return (
          <List.Item>
            <CatalogItem
              view={view}
              name={product.name}
              price={utils.finance.getFormatPriceWithCurrency(product.price)}
              imgSrc={product.images[0]}
              redirectLink={`${ROUTE_PATHS.product}/${product.id}`}
              isLoading={isLoading}
              isDisabled={isError || !product.inStock}
              addToCart={() => handleAddToCart(product.id)}
            />
          </List.Item>
        );
      }}
    />
  );
};

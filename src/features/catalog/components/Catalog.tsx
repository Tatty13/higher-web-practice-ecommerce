import { useMemo, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Flex, notification, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { Card, Loader } from '@/uiKit';
import type { ProductFilters, ProductSort, ProductView } from '@/types';

import { helpersCatalog } from '../helpers';
import { CatalogFilters } from './CatalogFilters';
import { CatalogList } from './CatalogList';
import { Toolbar } from './Toolbar';

export const Catalog: FC = () => {
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  const [filters, setFilters] = useState<ProductFilters>({});
  const [sort, setSort] = useState<ProductSort>();
  const [view, setView] = useState<ProductView>();

  const {
    data: catalogItems = [],
    isLoading: isLoadingGetCatalog,
    isError: isErrorGetCatalog,
    error: errorGetCatalog,
  } = api.catalog.useGetProductsQuery();

  const [
    addToCart,
    {
      isLoading: isLoadingAddToCart,
      isError: isErrorAddToCart,
      originalArgs: currentProductId,
    },
  ] = api.cart.useAddToCartMutation();

  const filteredProducts = useMemo(() => {
    return helpersCatalog.filterProducts(catalogItems, filters);
  }, [catalogItems, filters]);

  const sortedProducts = useMemo(() => {
    return helpersCatalog.sortProducts(filteredProducts, sort);
  }, [filteredProducts, sort]);

  const handleChangeSort = (value: ProductSort) => {
    setSort(value);
  };

  const handleChangeView = (value: ProductView) => {
    setView(value);
  };

  const handleChangeFilters = (filters: ProductFilters) => {
    setFilters((prev: ProductFilters) => ({ ...prev, ...filters }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);

    if (isErrorAddToCart) {
      notificationApi.error({
        message: 'Произошла ошибка при добавлении товара в корзину',
      });
      return;
    }

    navigate(ROUTE_PATHS.cart);
  };

  if (isLoadingGetCatalog) {
    return <Loader title='Загружаем каталог' />;
  }

  if (isErrorGetCatalog) {
    return (
      <Alert
        type='error'
        message='Не удалось загрузить каталог'
        description={JSON.stringify(errorGetCatalog)}
        showIcon
      />
    );
  }

  return (
    <Container gap='large'>
      {contextHolder}
      <CatalogFilters
        filters={filters}
        onChange={handleChangeFilters}
        onReset={handleResetFilters}
      />
      <Container
        vertical
        gap='small'>
        <Flex
          gap='large'
          justify='space-between'>
          <Typography.Title level={1}>УСЫ</Typography.Title>
          <Toolbar
            sort={sort}
            view={view}
            onSortChange={handleChangeSort}
            onViewChange={handleChangeView}
          />
        </Flex>

        <Card
          padding='large'
          justify='center'>
          <CatalogList
            view={view}
            items={sortedProducts}
            currentProductId={currentProductId}
            handleAddToCart={handleAddToCart}
            isLoadingAddToCart={isLoadingAddToCart}
            isErrorAddToCart={isErrorAddToCart}
          />
        </Card>
      </Container>
    </Container>
  );
};

const Container = styled(Flex)`
  width: 100%;
`;

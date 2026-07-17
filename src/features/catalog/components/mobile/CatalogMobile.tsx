import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Flex, notification } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { Search } from '@/components/common/Search';
import { FixedContainer, Loader } from '@/uiKit';

import { CatalogList } from '../CatalogList';

export const CatalogMobile: FC = () => {
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

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
    <ContentContainer
      vertical
      gap='middle'>
      {contextHolder}
      <FixedContainer>
        <Search />
      </FixedContainer>
      <CatalogList
        view='grid'
        gridStyle={{ gutter: 4, column: 2 }}
        items={catalogItems}
        currentProductId={currentProductId}
        handleAddToCart={handleAddToCart}
        isLoadingAddToCart={isLoadingAddToCart}
        isErrorAddToCart={isErrorAddToCart}
      />
    </ContentContainer>
  );
};

const ContentContainer = styled(Flex)`
  margin-top: 70px;
`;

import { useMemo, type FC } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import {
  Alert,
  Breadcrumb,
  Button,
  Flex,
  notification,
  Typography,
} from 'antd';

import { api } from '@/api';
import { FilterIcon } from '@/assets';
import { ROUTE_PATHS } from '@/app/paths';
import { Loader } from '@/uiKit';

import { helpersCatalog } from '../helpers';
import { CatalogList } from './CatalogList';

export const CatalogSubCategory: FC = () => {
  const { category, subCategory = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  const filters = helpersCatalog.parseFiltersFromSearchParams(searchParams);

  const {
    data: catalogItems = [],
    isLoading: isLoadingGetCatalog,
    isError: isErrorGetCatalog,
    error: errorGetCatalog,
  } = api.catalog.useGetProductsQuery(category);

  const [
    addToCart,
    {
      isLoading: isLoadingAddToCart,
      isError: isErrorAddToCart,
      originalArgs: currentProductId,
    },
  ] = api.cart.useAddToCartMutation();

  const filteredProducts = useMemo(() => {
    const items = catalogItems?.filter(
      (item) => item.characteristics['подкатегория'] === subCategory,
    );

    return helpersCatalog.filterProducts(items, filters);
  }, [catalogItems, subCategory, filters]);

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

  const renderCatalog = () => {
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
      <CatalogList
        items={filteredProducts}
        gridStyle={{ gutter: 4, column: 2 }}
        currentProductId={currentProductId}
        handleAddToCart={handleAddToCart}
        isLoadingAddToCart={isLoadingAddToCart}
        isErrorAddToCart={isErrorAddToCart}
      />
    );
  };

  return (
    <Flex
      vertical
      gap='middle'>
      {contextHolder}
      <Flex
        vertical
        gap={4}
        style={{ margin: '12px 0 16px' }}>
        <Breadcrumb
          items={[
            { title: <Link to={ROUTE_PATHS.catalog}>Усы</Link> },
            {
              title: (
                <Link to={`${ROUTE_PATHS.catalog}/${category}`}>
                  {category}
                </Link>
              ),
            },
          ]}
        />
        <Flex
          justify='space-between'
          align='center'>
          <Typography.Title level={4}>{subCategory}</Typography.Title>
          <Button
            type='text'
            icon={<FilterIcon />}
            onClick={() =>
              navigate(
                `${ROUTE_PATHS.catalogFiltersIndex}/${category}/${subCategory}?${searchParams}`,
              )
            }
          />
        </Flex>
      </Flex>

      {renderCatalog()}
    </Flex>
  );
};

import { useMemo, useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, notification, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';

import { Loader } from '@/uiKit';
import utils from '@/utils';

import { helpersCatalog } from '../helpers';
import { type UserRatingProps } from './UserRating';
import { ProductDesktop } from './ProductDesktop';
import { ProductMobile } from './ProductMobile';

export const Product: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();
  const { isMobile } = utils.responsive.useResponsive();

  const [rating, setRating] = useState(0);

  const {
    data: product,
    isLoading: isLoadingGetProduct,
    isError: isErrorGetProduct,
    refetch: refetchGetProduct,
  } = api.catalog.useGetProductByIdQuery(id!);

  const { data: ratings = [] } = api.catalog.useGetRatingsByProductIdQuery(id!);
  const { data: user } = api.user.useGetUserQuery();
  const { data: orders } = api.order.useGetOrderHistoryQuery();

  const [
    addToCart,
    { isLoading: isLoadingAddToCart, isError: isErrorAddToCart },
  ] = api.cart.useAddToCartMutation();

  const [
    addRating,
    { isLoading: isLoadingAddRating, isError: isErrorAddRating },
  ] = api.catalog.useAddRatingMutation();

  const characteristics = useMemo(() => {
    return Object.entries(product?.characteristics || {}).map(
      ([key, value]) => ({
        key,
        value,
      }),
    );
  }, [product]);

  const canUserRateProduct = useMemo(() => {
    return helpersCatalog.canUserRateProduct({
      user,
      ratings,
      productId: product?.id,
      orders,
    });
  }, [user, ratings, product, orders]);

  const carouselImages = useMemo(
    () =>
      product?.images.map((src, index) => ({
        id: `${product.id}-${index}`,
        src,
        alt: `${product.name} ${index + 1}`,
      })),
    [product],
  );

  const handleAddToCart = async () => {
    try {
      await addToCart(product!.id);

      if (isErrorAddToCart) {
        throw new Error('Произошла ошибка при добавлении товара в корзину');
      }

      navigate(ROUTE_PATHS.cart);
    } catch (err) {
      notificationApi.error({
        message: err instanceof Error && err.message,
      });
      return;
    }
  };

  const handleAddRating: UserRatingProps['setRating'] = async (rating) => {
    try {
      if (!user) {
        throw new Error('Авторизуйтесь, чтобы оценить товар');
      }

      await addRating({
        productId: product!.id,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName[0].toUpperCase()}.`,
        rating,
      });

      if (isErrorAddRating) {
        throw new Error('Произошла ошибка при добавлении рейтинга товара');
      }

      setRating(rating);
    } catch (err) {
      notificationApi.error({
        message: err instanceof Error && err.message,
      });
    }
  };

  if (isLoadingGetProduct) {
    return <Loader title='Загружаем информацию о товаре' />;
  }

  if (!product || isErrorGetProduct) {
    return (
      <NoProductContainer
        vertical
        gap='large'
        justify='flex-start'
        align='center'>
        <Typography.Title level={2}>
          Не удалось загрузить информацию о товаре
        </Typography.Title>
        <Button
          type='primary'
          size='large'
          onClick={refetchGetProduct}>
          Попробовать ещё раз
        </Button>
      </NoProductContainer>
    );
  }

  if (isMobile) {
    return (
      <>
        {contextHolder}
        <ProductMobile
          carouselImages={carouselImages}
          product={product}
          characteristics={characteristics}
          ratings={ratings}
          canUserRateProduct={canUserRateProduct}
          isLoadingAddToCartBtn={isLoadingAddToCart}
          isLoadingAddRating={isLoadingAddRating}
          rating={rating}
          handleAddToCart={handleAddToCart}
          setRating={handleAddRating}
        />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <ProductDesktop
        carouselImages={carouselImages}
        product={product}
        characteristics={characteristics}
        ratings={ratings}
        canUserRateProduct={canUserRateProduct}
        isLoadingAddToCartBtn={isLoadingAddToCart}
        isLoadingAddRating={isLoadingAddRating}
        rating={rating}
        handleAddToCart={handleAddToCart}
        setRating={handleAddRating}
      />
    </>
  );
};

const NoProductContainer = styled(Flex)`
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
  height: 100%;
  padding-top: 20px;

  background: url(' + MeditationImage + ') center / 60% no-repeat;
`;

import { useMemo, useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Button, Col, Flex, List, notification, Row, Typography } from 'antd';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import { MeditationImage, ShoppingBagIcon, StarIcon } from '@/assets';
import { selectorsAuth } from '@/features/auth';
import { useAppSelector } from '@/store';
import { tokens } from '@/theme/tokens';
import { Card, Divider, ImageCarousel, Loader, Text } from '@/uiKit';
import utils from '@/utils';

import { helpersCatalog } from '../helpers';
import { Rating, type RatingProps } from './Rating';
import { RatingList } from './RatingList';

export const Product: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notificationApi, contextHolder] = notification.useNotification();

  const [rating, setRating] = useState(0);

  const userId = useAppSelector(selectorsAuth.userId);

  const {
    data: product,
    isLoading: isLoadingGetProduct,
    isError: isErrorGetProduct,
    refetch: refetchGetProduct,
  } = api.catalog.useGetProductByIdQuery(id!);

  const { data: ratings = [] } = api.catalog.useGetRatingsByProductIdQuery(id!);
  const { data: user } = api.user.useGetUserQuery(userId ?? skipToken);
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

  const handleAddRating: RatingProps['setRating'] = async (rating) => {
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
      <Container
        vertical
        withImage
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
      </Container>
    );
  }

  return (
    <Container
      vertical
      gap='large'>
      {contextHolder}
      <Card
        vertical
        padding='large'>
        <Row
          gutter={[20, 30]}
          style={{ width: '100%' }}>
          <Col span={12}>
            <ImageCarousel images={carouselImages} />
          </Col>
          <MainContent span={12}>
            <Flex
              gap='middle'
              justify='space-between'>
              <Flex
                vertical
                gap='large'>
                <Typography.Title level={1}>{product.name}</Typography.Title>
                <Typography.Title
                  level={1}
                  type='success'>
                  {utils.finance.getFormatPriceWithCurrency(product.price)}
                </Typography.Title>
              </Flex>
              <Flex
                vertical
                align='end'>
                <Flex
                  align='center'
                  gap='small'>
                  <StarIcon
                    width={32}
                    height={32}
                    fill={tokens.colors.accentSecondary}
                    color={tokens.colors.accentSecondary}
                  />
                  <Typography.Title level={1}>
                    {helpersCatalog.getAverageRating(ratings)}
                  </Typography.Title>
                </Flex>
                <Typography.Text type='secondary'>
                  {helpersCatalog.getProductRatingDescription(ratings.length)}
                </Typography.Text>
              </Flex>
            </Flex>
            <Flex
              gap='middle'
              justify='space-between'
              align='flex-end'>
              <CartButton
                type='primary'
                size='large'
                loading={isLoadingAddToCart}
                disabled={!product.inStock}
                onClick={handleAddToCart}>
                <ShoppingBagIcon />
              </CartButton>
              <Typography.Text type='secondary'>
                {product.inStock ? 'Есть' : 'Нет'} в наличии
              </Typography.Text>
            </Flex>

            {product.description && (
              <Flex
                vertical
                gap={4}>
                <Typography.Text strong>Описание</Typography.Text>
                <Typography.Text type='secondary'>
                  {product.description}
                </Typography.Text>
              </Flex>
            )}

            {characteristics.length > 0 && (
              <Flex
                vertical
                gap='small'>
                <Typography.Text strong>О товаре</Typography.Text>
                <List
                  dataSource={characteristics}
                  rowKey='key'
                  size='small'
                  renderItem={({ key, value }) => {
                    return (
                      <List.Item>
                        <Text
                          type='secondary'
                          size={12}>
                          {key}
                        </Text>
                        <Text>{value}</Text>
                      </List.Item>
                    );
                  }}
                />
                <Divider color='light' />
              </Flex>
            )}
          </MainContent>
        </Row>
      </Card>
      <Card
        vertical
        gap='middle'
        padding='large'>
        {canUserRateProduct && (
          <Flex
            vertical
            gap='small'>
            <Typography.Text>Оцените усы</Typography.Text>
            <Rating
              value={rating}
              disabled={isLoadingAddRating}
              setRating={handleAddRating}
            />
          </Flex>
        )}

        <Flex vertical>
          <Divider color='light' />
          <RatingList ratings={ratings} />
        </Flex>
      </Card>
    </Container>
  );
};

const Container = styled(Flex)<{ withImage?: boolean }>`
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
  height: 100%;
  padding-top: ${({ withImage }) => (withImage ? '20px' : 'unset')};

  background: ${({ withImage }) =>
    withImage ? 'url(' + MeditationImage + ') center / 60% no-repeat' : 'none'};
`;

const MainContent = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartButton = styled(Button)`
  width: 180px;
`;

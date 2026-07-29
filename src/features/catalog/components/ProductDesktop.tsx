import { type FC } from 'react';
import { Button, Col, Flex, List, Row, Typography } from 'antd';
import styled from 'styled-components';

import { ShoppingBagIcon, StarIcon } from '@/assets';
import { tokens } from '@/theme/tokens';
import { Card, Divider, CarouselWithPreview, Text } from '@/uiKit';
import utils from '@/utils';

import type { ProductProps } from '../type';
import { UserRating } from './UserRating';
import { RatingList } from './RatingList';
import { helpersCatalog } from '../helpers';

export const ProductDesktop: FC<ProductProps> = ({
  carouselImages,
  product,
  characteristics,
  ratings,
  canUserRateProduct,
  isLoadingAddToCartBtn,
  rating,
  isLoadingAddRating,
  handleAddToCart,
  setRating,
}) => {
  return (
    <Container
      vertical
      gap='large'>
      <Card
        vertical
        padding='large'>
        <Row
          gutter={[20, 30]}
          style={{ width: '100%' }}>
          <Col
            xs={24}
            md={12}>
            <CarouselWithPreview images={carouselImages} />
          </Col>
          <MainContent
            xs={24}
            md={12}>
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
                loading={isLoadingAddToCartBtn}
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
            align='start'
            gap='small'>
            <Typography.Text>Оцените усы</Typography.Text>
            <UserRating
              value={rating}
              disabled={isLoadingAddRating}
              setRating={setRating}
            />
          </Flex>
        )}

        <Flex vertical>
          {canUserRateProduct && <Divider color='light' />}
          <RatingList ratings={ratings} />
        </Flex>
      </Card>
    </Container>
  );
};

const Container = styled(Flex)`
  margin: 0 auto;
  width: 100%;
  max-width: 980px;
  height: 100%;
`;

const MainContent = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CartButton = styled(Button)`
  width: 180px;
`;

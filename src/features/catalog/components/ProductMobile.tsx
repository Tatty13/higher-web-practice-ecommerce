import { type FC } from 'react';
import { Button, Col, Flex, List, Row, Typography } from 'antd';
import styled from 'styled-components';

import { ShoppingBagIcon, StarIcon } from '@/assets';
import { tokens } from '@/theme/tokens';
import { Divider, Text, Carousel } from '@/uiKit';
import utils from '@/utils';

import type { ProductProps } from '../type';
import { UserRating } from './UserRating';
import { RatingList } from './RatingList';
import { helpersCatalog } from '../helpers';

export const ProductMobile: FC<ProductProps> = ({
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
      <Row
        gutter={[0, 12]}
        style={{ width: '100%' }}>
        <Col xs={24}>
          <Carousel images={carouselImages} />
        </Col>
        <MainContent xs={24}>
          <Flex
            gap='middle'
            justify='space-between'>
            <Flex
              vertical
              gap='large'>
              <Typography.Title level={2}>{product.name}</Typography.Title>
              <Typography.Title
                level={2}
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
                  width={16}
                  height={16}
                  fill={tokens.colors.accentSecondary}
                  color={tokens.colors.accentSecondary}
                />
                <Typography.Title level={2}>
                  {helpersCatalog.getAverageRating(ratings)}
                </Typography.Title>
              </Flex>
              <Text
                type='secondary'
                size={12}>
                {helpersCatalog.getProductRatingDescription(ratings.length)}
              </Text>
            </Flex>
          </Flex>

          {product.description && (
            <Flex
              vertical
              gap={4}>
              <Typography.Text strong>Описание</Typography.Text>
              <Text
                type='secondary'
                size={12}>
                {product.description}
              </Text>
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
                      <Text size={14}>{value}</Text>
                    </List.Item>
                  );
                }}
              />
              <Divider color='light' />
            </Flex>
          )}
        </MainContent>
      </Row>

      {canUserRateProduct && (
        <Flex
          vertical
          align='center'
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

      <Flex>
        <CartButton
          type='primary'
          size='large'
          loading={isLoadingAddToCartBtn}
          disabled={!product.inStock}
          onClick={handleAddToCart}
          style={{ width: '100%' }}>
          <ShoppingBagIcon />
        </CartButton>
      </Flex>
    </Container>
  );
};

const Container = styled(Flex)`
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

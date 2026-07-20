import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex, List, Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

import { ROUTE_PATHS } from '@/app/paths';
import { tokens } from '@/theme/tokens';
import utils from '@/utils';

import type { OrderItem } from '../types';

type ProductListOrderHistoryProps = {
  items: OrderItem[];
};

export const ProductLisOrderHistory: FC<ProductListOrderHistoryProps> = ({
  items,
}) => {
  return (
    <List
      dataSource={items}
      rowKey='productId'
      size='large'
      renderItem={(item) => {
        return (
          <Item>
            <ItemLink
              to={`${ROUTE_PATHS.product}/${item.productId}`}
              style={{ width: '100%' }}>
              <Container
                align='center'
                gap='small'>
                <ProductImage
                  src={item.image}
                  alt={item.name}
                />
                <Flex vertical>
                  <Title>{item.name}</Title>
                  <Typography.Text type='secondary'>
                    {item.quantity} шт.
                  </Typography.Text>
                </Flex>

                <Price>
                  {utils.finance.getFormatPriceWithCurrency(item.price)}
                </Price>
              </Container>
            </ItemLink>
          </Item>
        );
      }}
    />
  );
};

const Item = styled(List.Item)`
  &&& {
    border-block-end: 1px solid ${theme.colors.neutralDisable};
  }
`;

const ItemLink = styled(Link)`
  width: 100%;
`;

const Container = styled(Flex)`
  width: 100%;
`;

const ProductImage = styled.img`
  width: 80px;

  @media screen and (${tokens.app.mediaMobileWidthS}) {
    width: 60px;
  }
`;

const Title = styled(Typography.Text)`
  color: ${theme.colors.accentSecondary};
`;

const Price = styled(Typography.Text)`
  margin-left: auto;
`;

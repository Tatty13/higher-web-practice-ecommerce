import type { FC } from 'react';
import { Flex, List, Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

import type { OrderItem } from '../types';
import utils from '@/utils';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/app/paths';

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
                <img
                  src={item.image}
                  width={80}
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

const Title = styled(Typography.Text)`
  color: ${theme.colors.accentSecondary};
`;

const Price = styled(Typography.Text)`
  margin-left: auto;
`;

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { ShoppingBagIcon } from '@/assets';
import type { ProductView } from '@/types';

type CatalogItemProps = {
  view: ProductView | undefined;
  name: string;
  imgSrc: string;
  price: string;
  redirectLink: string;
  isLoading: boolean;
  isDisabled: boolean;
  addToCart: () => void;
};

const GridViewItem: FC<Omit<CatalogItemProps, 'view'>> = ({
  name,
  imgSrc,
  price,
  isLoading,
  isDisabled,
  redirectLink,
  addToCart,
}) => {
  return (
    <Container
      vertical
      gap='small'>
      <Link to={redirectLink}>
        <Flex vertical>
          <Flex>
            <img
              style={{ width: '100%' }}
              src={imgSrc}
              alt={name}
            />
          </Flex>
          <Typography.Text>{name}</Typography.Text>
          <Typography.Title
            level={3}
            type='success'>
            {price}
          </Typography.Title>
        </Flex>
      </Link>
      <Button
        type='primary'
        size='large'
        loading={isLoading}
        disabled={isDisabled}
        onClick={addToCart}>
        <ShoppingBagIcon />
      </Button>
    </Container>
  );
};

const ListViewItem: FC<Omit<CatalogItemProps, 'view'>> = ({
  name,
  imgSrc,
  price,
  isLoading,
  isDisabled,
  redirectLink,
  addToCart,
}) => {
  return (
    <Container
      wrap
      align='center'
      gap='large'>
      <Link
        to={redirectLink}
        style={{ flex: 1 }}>
        <Flex
          align='center'
          style={{ minWidth: 420 }}
          gap='middle'>
          <img
            width={120}
            src={imgSrc}
            alt={name}
          />

          <Typography.Text>{name}</Typography.Text>
          <Typography.Title
            level={2}
            type='success'
            style={{ marginLeft: 'auto' }}>
            {price}
          </Typography.Title>
        </Flex>
      </Link>
      <Button
        type='primary'
        size='large'
        loading={isLoading}
        disabled={isDisabled}
        style={{ minWidth: '200px' }}
        onClick={addToCart}>
        <ShoppingBagIcon />
      </Button>
    </Container>
  );
};

export const CatalogItem: FC<CatalogItemProps> = ({ view, ...otherProps }) => {
  const isListView = view === 'list';

  if (isListView) {
    return <ListViewItem {...otherProps} />;
  }

  return <GridViewItem {...otherProps} />;
};

const Container = styled(Flex)`
  width: 100%;

  &:hover {
    transform: scale(0.99);
  }
`;

import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import styled from 'styled-components';

import { RightArrowIcon } from '@/assets';
import type { CatalogNavListItem } from '../type';

type CatalogNavListProps = {
  items: CatalogNavListItem[];
};

export const CatalogNavList: FC<CatalogNavListProps> = ({ items = [] }) => {
  return (
    <Flex
      vertical
      gap={12}>
      {items.map((item) => (
        <RowLink
          key={item.label}
          to={item.to ?? '#'}>
          <Typography.Text>{item.label}</Typography.Text>
          <RightArrowIcon />
        </RowLink>
      ))}
    </Flex>
  );
};

const RowLink = styled(Link)`
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

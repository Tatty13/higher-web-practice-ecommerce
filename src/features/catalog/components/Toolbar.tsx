import type { FC } from 'react';
import { Flex, Select, type SelectProps } from 'antd';
import styled from 'styled-components';

import type { ProductSort, ProductView } from '@/types';

type SortOption = {
  label: string;
  value: ProductSort;
};

type ViewOption = {
  label: string;
  value: ProductView;
};

const sortOptions: SortOption[] = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Дешевле', value: 'price_asc' },
  { label: 'Дороже', value: 'price_desc' },
  { label: 'Новинки', value: 'newest' },
  { label: 'С высоким рейтингом', value: 'rating' },
];

const viewOptions: ViewOption[] = [
  { label: 'Плитка', value: 'grid' },
  { label: 'Список', value: 'list' },
];

type ToolbarProps = {
  sort: ProductSort | undefined;
  view: ProductView | undefined;
  onSortChange: SelectProps['onChange'];
  onViewChange: SelectProps['onChange'];
};

export const Toolbar: FC<ToolbarProps> = ({
  sort,
  view,
  onSortChange,
  onViewChange,
}) => {

  return (
    <Flex gap='small'>
      <StyledSelect
        placeholder='Сортировка'
        options={sortOptions}
        value={sort}
        onChange={onSortChange}
      />
      <StyledSelect
        placeholder='Отображение'
        options={viewOptions}
        value={view}
        onChange={onViewChange}
      />
    </Flex>
  );
};

const StyledSelect = styled(Select)`
  min-width: 150px;
  width: max-content;
`;

import type { FC, ReactNode } from 'react';
import { Button, Checkbox, Flex, InputNumber, Radio, Typography } from 'antd';
import styled from 'styled-components';

import type { ProductFilters } from '@/types';
import { Card, SwitchWithTitle } from '@/uiKit';

type SectionProps = {
  title: string;
  children: ReactNode;
};

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <Flex
      vertical
      gap={12}>
      <Typography.Text strong>{title}</Typography.Text>
      {children}
    </Flex>
  );
};

const categoryOptions = [
  'Классические',
  'Исторические',
  'Театральные',
  'Экстравагантные',
  'Современные',
];

type StyleOption =
  | 'Деловой'
  | 'Винтаж'
  | 'Театральный'
  | 'Экспериментальный'
  | 'Военный';

const styleOptions: StyleOption[] = [
  'Деловой',
  'Винтаж',
  'Театральный',
  'Экспериментальный',
  'Военный',
];

const thicknessOptions = ['Низкая', 'Средняя', 'Высокая'];

type CatalogFiltersProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
};

export const CatalogFilters: FC<CatalogFiltersProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const isEmptyFilters = Object.keys(filters).length === 0;

  return (
    <FiltersContainer
      vertical
      padding='large'
      gap='large'>
      <Section title='Категория'>
        <CategoryGroup
          value={filters.category}
          optionType='button'
          size='large'
          options={categoryOptions}
          onChange={(evt) => onChange({ category: evt.target.value })}
        />
      </Section>
      <Section title='Стиль'>
        <StyleGroup
          value={filters.style ?? []}
          options={styleOptions}
          onChange={(checkedOptions) =>
            onChange({ style: checkedOptions as StyleOption[] })
          }
        />
      </Section>
      <Section title='Густота'>
        <ThicknessGroup
          value={filters.thickness}
          options={thicknessOptions}
          onChange={(evt) => onChange({ thickness: evt.target.value })}
        />
      </Section>
      <Section title='Фильтр'>
        <SwitchWithTitle
          title='в наличии'
          checked={Boolean(filters.inStock)}
          onChange={(isChecked) => onChange({ inStock: isChecked })}
        />
      </Section>
      <Section title='Цена'>
        <Flex gap='small'>
          <InputNumber
            value={filters.minPrice}
            placeholder='от'
            size='large'
            controls={false}
            onChange={(num) => onChange({ minPrice: num ?? undefined })}
            style={{ width: '100%' }}
          />
          <InputNumber
            value={filters.maxPrice}
            placeholder='до'
            size='large'
            controls={false}
            onChange={(num) => onChange({ maxPrice: num ?? undefined })}
            style={{ width: '100%' }}
          />
        </Flex>
      </Section>
      <Button
        size='large'
        disabled={isEmptyFilters}
        onClick={onReset}>
        Очистить фильтры
      </Button>
    </FiltersContainer>
  );
};

const FiltersContainer = styled(Card)`
  max-width: 279px;
`;

const CategoryGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;

  & .ant-radio-button-wrapper {
    border: none;
  }
`;

const StyleGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ThicknessGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

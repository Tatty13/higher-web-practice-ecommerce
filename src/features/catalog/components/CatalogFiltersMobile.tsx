import { useMemo, useState, type FC, type PropsWithChildren } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Checkbox, Flex, InputNumber, Radio, Typography } from 'antd';
import styled from 'styled-components';

import { ROUTE_PATHS } from '@/app/paths';
import type { ProductFilters } from '@/types';
import { Card, SwitchWithTitle, Text } from '@/uiKit';
import utils from '@/utils';

import { helpersCatalog } from '../helpers';
import type { MustacheStyle } from '../type';
import { CatalogMobileTitle } from './CatalogMobileTitle';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <Card
      vertical
      gap={12}>
      <Typography.Text strong>{title}</Typography.Text>
      {children}
    </Card>
  );
};

export const CatalogFiltersMobile: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { category, subCategory } = useParams();

  const initialFilters =
    helpersCatalog.parseFiltersFromSearchParams(searchParams);

  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  const subCategoryPath = useMemo(() => {
    return `${ROUTE_PATHS.catalog}/${category}/${subCategory}`;
  }, [category, subCategory]);

  const isEmptyFilters = Object.keys(filters).length === 0;

  const handleChangeFilters = (filters: ProductFilters) => {
    setFilters((prev: ProductFilters) => ({ ...prev, ...filters }));
  };

  const handleGoBack = () => {
    navigate({
      pathname: subCategoryPath,
      search: searchParams.toString(),
    });
  };

  const confirmFilters = () => {
    navigate({
      pathname: subCategoryPath,
      search: utils.qs.createQS(filters),
    });
  };

  return (
    <Flex
      vertical
      gap='large'
      justify='space-between'
      style={{ height: '100%' }}>
      <CatalogMobileTitle
        title='Фильтры'
        size='large'
        goBack={handleGoBack}
      />
      <Flex
        vertical
        gap='middle'>
        <Section title='Цена'>
          <Flex gap='small'>
            <Flex
              vertical
              flex={1}>
              <Text
                type='secondary'
                size={12}>
                От
              </Text>
              <InputNumber
                value={filters.minPrice}
                placeholder='от'
                size='large'
                controls={false}
                onChange={(num) =>
                  handleChangeFilters({ minPrice: num ?? undefined })
                }
                style={{ width: '100%' }}
              />
            </Flex>
            <Flex
              vertical
              flex={1}>
              <Text
                type='secondary'
                size={12}>
                До
              </Text>
              <InputNumber
                value={filters.maxPrice}
                placeholder='до'
                size='large'
                controls={false}
                onChange={(num) =>
                  handleChangeFilters({ maxPrice: num ?? undefined })
                }
                style={{ width: '100%' }}
              />
            </Flex>
          </Flex>
        </Section>

        <Section title='Стиль'>
          <StyleGroup
            value={filters.style ?? []}
            options={helpersCatalog.mustacheStyles}
            onChange={(checkedOptions) =>
              handleChangeFilters({ style: checkedOptions as MustacheStyle[] })
            }
          />
        </Section>
        <Section title='Густота'>
          <IntensityGroup
            value={filters.thickness}
            options={helpersCatalog.intensityOptions}
            onChange={(evt) =>
              handleChangeFilters({ thickness: evt.target.value })
            }
          />
        </Section>
        <Section title='Закрученность'>
          <IntensityGroup
            value={filters.curliness}
            options={helpersCatalog.intensityOptions}
            onChange={(evt) =>
              handleChangeFilters({ curliness: evt.target.value })
            }
          />
        </Section>
        <Section title='Фильтр'>
          <SwitchWithTitle
            title='в наличии'
            checked={Boolean(filters.inStock)}
            onChange={(isChecked) =>
              handleChangeFilters({ inStock: isChecked })
            }
          />
        </Section>
      </Flex>

      <Button
        size='large'
        type='primary'
        disabled={isEmptyFilters}
        onClick={confirmFilters}>
        Применить фильтры
      </Button>
    </Flex>
  );
};

const StyleGroup = styled(Checkbox.Group)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IntensityGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

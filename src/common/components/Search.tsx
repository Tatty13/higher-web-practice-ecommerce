import { useMemo, useState, type FC, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  AutoComplete,
  Flex,
  Input,
  Typography,
  type AutoCompleteProps,
} from 'antd';
import type { SearchProps } from 'antd/es/input';
import styled from 'styled-components';

import { api } from '@/api';
import { ROUTE_PATHS } from '@/app/paths';
import utils from '@/utils';
import type { Product } from '@/types';

const MIN_QUERY_LENGTH = 2;

type SearchOption = {
  value: string;
  label: JSX.Element;
  product: Product;
};

export const Search: FC = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = utils.debounce.useDebouncedValue(
    searchValue.trim(),
  );

  const { data: products = [], isLoading: isLoadingGetProducts } =
    api.catalog.useGetProductsQuery(
      debouncedSearchValue.length >= MIN_QUERY_LENGTH
        ? debouncedSearchValue
        : skipToken,
    );

  const options: SearchOption[] = useMemo(() => {
    return products.map((product) => ({
      value: product.name,
      label: (
        <OptionContent
          gap='large'
          align='center'
          justify='space-between'>
          <Typography.Text strong>{product.name}</Typography.Text>
          <Typography.Text type='secondary'>
            {utils.finance.getFormatPriceWithCurrency(product.price)}
          </Typography.Text>
        </OptionContent>
      ),
      product,
    }));
  }, [products]);

  const handleSearch: SearchProps['onSearch'] = (value) => {
    const normalizedValue = value.trim();

    if (!normalizedValue) return;

    const exactMatch = products.find(
      (product) => product.name.toLowerCase() === normalizedValue.toLowerCase(),
    );

    if (exactMatch) {
      navigate(`${ROUTE_PATHS.product}/${exactMatch.id}`);
      return;
    }

    if (products.length > 0) {
      navigate(`${ROUTE_PATHS.product}/${products[0].id}`);
    }
  };

  const handleSelect: AutoCompleteProps['onSelect'] = (_, option) => {
    navigate(`${ROUTE_PATHS.product}/${option.product?.id}`);
  };

  return (
    <StyledAutoComplete
      size='large'
      options={options}
      notFoundContent={
        debouncedSearchValue.length >= MIN_QUERY_LENGTH && !isLoadingGetProducts
          ? 'Ничего не найдено'
          : null
      }
      onSelect={handleSelect}>
      <Input.Search
        enterButton
        placeholder='Искать'
        size='large'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        loading={isLoadingGetProducts}
      />
    </StyledAutoComplete>
  );
};

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
`;

const OptionContent = styled(Flex)`
  padding: 6px 8px;
`;

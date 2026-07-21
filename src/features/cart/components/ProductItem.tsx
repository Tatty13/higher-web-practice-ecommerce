import type { FC } from 'react';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { BasketIcon } from '@/assets';
import { Card } from '@/uiKit';
import { theme } from '@/theme/styledTheme';
import { tokens } from '@/theme/tokens';
import utils from '@/utils';
import type { Product } from '@/types';

type ProductItemProps = {
  product: Product;
  quantity: number;
  isDisabledActions: boolean;
  decrementItem: () => void;
  incrementItem: () => void;
  removeItem: () => void;
};

export const ProductItem: FC<ProductItemProps> = ({
  product,
  quantity,
  isDisabledActions,
  decrementItem,
  incrementItem,
  removeItem,
}) => {
  const { isMobile } = utils.responsive.useResponsive();

  return (
    <Content
      align='center'
      justify='space-between'
      gap='large'
      wrap>
      <Image
        src={product.images[0]}
        alt={product.name}
      />
      <ContentBlock flex={1}>
        <Title ellipsis={{ tooltip: product.name }}>{product.name}</Title>
        <Flex
          gap={isMobile ? 'small' : 'middle'}
          align='center'>
          <CountButton
            disabled={isDisabledActions}
            onClick={decrementItem}>
            -
          </CountButton>
          <Typography.Title level={isMobile ? 4 : 3}>
            {quantity}
          </Typography.Title>
          <CountButton
            disabled={isDisabledActions}
            onClick={incrementItem}>
            +
          </CountButton>
        </Flex>
      </ContentBlock>

      <ContentBlock align='end'>
        <Typography.Title level={isMobile ? 4 : 2}>
          {utils.finance.getFormatPriceWithCurrency(product.price)}
        </Typography.Title>

        <BasketButton
          type='text'
          icon={<BasketIcon />}
          disabled={isDisabledActions}
          onClick={removeItem}
        />
      </ContentBlock>
    </Content>
  );
};

const Content = styled(Card)`
  @media screen and (${tokens.app.mediaMobileWidthM}) {
    padding: 0;
    align-items: stretch;
    background: inherit;
    box-shadow: none;
    padding-bottom: 12px;
    border-bottom: 1px solid ${theme.colors.bgShadows};

    &:hover {
      background: inherit;
    }
  }
`;

const ContentBlock = styled(Flex)`
  justify-content: space-between;
  gap: 32px;

  @media screen and (${tokens.app.mediaMobileWidthM}) {
    flex-direction: column;
    gap: 6px;
    justify-content: space-between;
  }
`;

const Image = styled.img`
  width: 80px;

  @media screen and (${tokens.app.mediaMobileWidthS}) {
    width: 60px;
  }
`;

const Title = styled(Typography.Text)`
  flex: 1;
  color: ${theme.colors.accentSecondary};

  &&& {
    @media screen and (min-width: 1120px) {
      max-width: 120px;
    }
  }
`;

const CountButton = styled(Button)`
  background: ${theme.colors.bgDisable};
  border-color: transparent;
  color: ${theme.colors.neutralPrimary};
  font-weight: 700;
  font-size: 14px;

  @media screen and (${tokens.app.mediaMobileWidthS}) {
    width: 24px;
    height: 24px;
  }
`;

const BasketButton = styled(Button)`
  color: ${theme.colors.accentPrimary};
`;

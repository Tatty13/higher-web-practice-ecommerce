import type { FC } from 'react';
import { Button, Flex, Typography } from 'antd';

import { ArrowIcon } from '@/assets';

type Size = 'small' | 'large';

const titleSizeMap: Record<Size, 2 | 4> = {
  large: 2,
  small: 4,
};

const iconSizeMap: Record<Size, number> = {
  small: 16,
  large: 24,
};

type CatalogMobileTitleProps = {
  title: string;
  size?: Size;
  goBack?: () => void;
};

export const CatalogMobileTitle: FC<CatalogMobileTitleProps> = ({
  title,
  size = 'small',
  goBack,
}) => {
  return (
    <Flex
      justify='space-between'
      align='center'>
      <Flex
        align='center'
        gap={8}>
        {goBack && (
          <Button
            type='text'
            size={size}
            icon={<ArrowIcon width={iconSizeMap[size]} />}
            onClick={goBack}
          />
        )}
        <Typography.Title
          level={titleSizeMap[size]}
          style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>
    </Flex>
  );
};

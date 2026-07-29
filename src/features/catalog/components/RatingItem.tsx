import type { FC } from 'react';
import { Flex } from 'antd';

import { Stars, Text } from '@/uiKit';
import utils from '@/utils';
import type { ProductRating } from '@/types';

type RatingItemProps = {
  item: ProductRating;
};

export const RatingItemDesktop: FC<RatingItemProps> = ({ item }) => {
  return (
    <>
      <Flex
        gap='middle'
        align='center'>
        <Flex
          gap='small'
          align='center'>
          <Stars rating={item.rating} />
          <Text strong>{item.rating.toFixed(1)}</Text>
        </Flex>
        <Text>{item.userName}</Text>
      </Flex>
      <Text
        type='secondary'
        size={14}>
        {utils.date.formatDateToReadableString(item.createdAt).slice(0, -3)}
      </Text>
    </>
  );
};

export const RatingItemMobile: FC<RatingItemProps> = ({ item }) => {
  return (
    <Flex
      vertical
      gap='small'
      style={{ width: '100%' }}>
      <Flex
        gap='small'
        align='center'>
        <Text
          strong
          size={14}>
          {item.rating.toFixed(1)}
        </Text>
        <Stars rating={item.rating} />
      </Flex>

      <Flex
        gap='small'
        justify='space-between'
        align='center'>
        <Text size={14}>{item.userName}</Text>
        <Text
          type='secondary'
          size={12}>
          {utils.date.formatDateToReadableString(item.createdAt).slice(0, -3)}
        </Text>
      </Flex>
    </Flex>
  );
};

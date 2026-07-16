import type { FC } from 'react';
import { Empty, Flex, List } from 'antd';

import { StarIcon } from '@/assets';
import { Text } from '@/uiKit';
import { tokens } from '@/theme/tokens';
import utils from '@/utils';
import type { ProductRating } from '@/types';

type RatingListProps = {
  ratings: ProductRating[];
};

export const RatingList: FC<RatingListProps> = ({ ratings }) => {
  return (
    <List
      dataSource={ratings}
      rowKey='id'
      size='large'
      locale={{
        emptyText: (
          <Empty description='У товара ещё нет оценок. Вы можете стать первым' />
        ),
      }}
      renderItem={(item) => {
        return (
          <List.Item>
            <Flex
              gap='middle'
              align='center'>
              <Flex
                gap='small'
                align='center'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    width={16}
                    height={16}
                    fill={
                      star <= item.rating
                        ? tokens.colors.accentPrimary
                        : 'transparent'
                    }
                    color={tokens.colors.accentPrimary}
                  />
                ))}
                <Text strong>{item.rating.toFixed(1)}</Text>
              </Flex>
              <Text>{item.userName}</Text>
            </Flex>
            <Text
              type='secondary'
              size={14}>
              {utils.date
                .formatDateToReadableString(item.createdAt)
                .slice(0, -3)}
            </Text>
          </List.Item>
        );
      }}
    />
  );
};

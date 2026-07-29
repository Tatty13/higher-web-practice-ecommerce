import type { FC } from 'react';
import { Empty, List } from 'antd';

import utils from '@/utils';
import type { ProductRating } from '@/types';
import { RatingItemDesktop, RatingItemMobile } from './RatingItem';

type RatingListProps = {
  ratings: ProductRating[];
};

export const RatingList: FC<RatingListProps> = ({ ratings }) => {
  const { isMobile } = utils.responsive.useResponsive();

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
            {isMobile ? (
              <RatingItemMobile item={item} />
            ) : (
              <RatingItemDesktop item={item} />
            )}
          </List.Item>
        );
      }}
    />
  );
};

import type { FC } from 'react';

import { StarIcon } from '@/assets';
import { tokens } from '@/theme/tokens';

type StarsProps = {
  rating: number;
};

export const Stars: FC<StarsProps> = ({ rating }) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <StarIcon
      key={star}
      width={16}
      height={16}
      fill={star <= rating ? tokens.colors.accentPrimary : 'transparent'}
      color={tokens.colors.accentPrimary}
    />
  ));
};

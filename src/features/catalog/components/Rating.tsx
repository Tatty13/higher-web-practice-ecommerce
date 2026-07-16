import { useState, type FC } from 'react';
import { Flex } from 'antd';
import styled from 'styled-components';

import { StarIcon } from '@/assets';
import { tokens } from '@/theme/tokens';

export type RatingProps = {
  value: number;
  disabled: boolean;
  size?: number;
  setRating: (rating: number) => void;
};

export const Rating: FC<RatingProps> = ({
  value,
  size = 32,
  disabled,
  setRating,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  return (
    <Flex gap='small'>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hoveredRating ?? value);

        return (
          <StarButton
            key={star}
            type='button'
            disabled={disabled}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => setRating(star)}
            aria-label={`Оценить на ${star}`}>
            <StarIcon
              width={size}
              height={size}
              fill={isActive ? tokens.colors.accentSecondary : 'transparent'}
              color={tokens.colors.accentSecondary}
            />
          </StarButton>
        );
      })}
    </Flex>
  );
};

const StarButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

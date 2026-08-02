import type { FC, PropsWithChildren } from 'react';
import { Flex, type FlexProps } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

type Padding = 'small' | 'medium' | 'large';

type ContainerProps = {
  $padding: Padding;
  $active: boolean;
  $hoverable: boolean;
};

type CardProps = PropsWithChildren<
  Partial<{
    padding: Padding;
    active: boolean;
    hoverable: boolean;
  }>
>;

const paddingMap: Record<Padding, string> = {
  small: '16px',
  medium: '20px 16px',
  large: '24px',
};

export const Card: FC<FlexProps & CardProps> = ({
  padding = 'small',
  active = false,
  hoverable = false,
  children,
  ...flexProps
}) => {
  return (
    <Container
      $padding={padding}
      $active={active}
      $hoverable={hoverable}
      {...flexProps}>
      {children}
    </Container>
  );
};

const Container = styled(Flex)<ContainerProps>`
  padding: ${({ $padding }) => paddingMap[$padding]};
  width: 100%;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? theme.colors.bgShadows : theme.colors.bgSecondary};
  box-shadow: ${({ $active }) =>
      $active ? theme.colors.bgDisable : theme.colors.bgShadows}
    0 4px 8px;
  cursor: ${({ $hoverable }) => ($hoverable ? 'pointer' : 'default')};

  &:hover {
    background: ${({ $hoverable, $active }) =>
      $hoverable && $active
        ? theme.colors.bgShadows
        : $hoverable
          ? theme.colors.bgDisable
          : theme.colors.bgSecondary};
  }
`;

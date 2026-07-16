import { Divider as AntDivider } from 'antd';
import styled from 'styled-components';

import { tokens } from '@/theme/tokens';

type Color = 'light' | 'dark';

type DividerProps = {
  color?: Color;
  margin?: string;
};

const colorsMap: Record<Color, string> = {
  dark: tokens.colors.neutralDisable,
  light: tokens.colors.bgShadows,
};

export const Divider = styled(AntDivider)<DividerProps>`
  margin: ${({ margin = 0 }) => margin};
  background: ${({ color = 'dark' }) => colorsMap[color]};
`;

import { Typography } from 'antd';
import styled from 'styled-components';

type TextProps = {
  size?: number;
  color?: string;
};

export const Text = styled(Typography.Text)<TextProps>`
  font-size: ${({ size = 16 }) => size}px;
  color: ${({ color }) => color ?? 'inherit'};
`;

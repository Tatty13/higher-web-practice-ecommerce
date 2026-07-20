import { Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

import type { OrderStatus as TOrderStatus } from '../types';

export const OrderStatus = styled(Typography.Text)<{ status: TOrderStatus }>`
  color: ${({ status }) =>
    status === 'delivered'
      ? theme.colors.success
      : theme.colors.accentSecondary};
`;

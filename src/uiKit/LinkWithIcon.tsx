import type { FC, FunctionComponent, SVGProps } from 'react';
import { NavLink, type NavLinkProps } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

type LinkWithIconProps = {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title?: string;
  iconSize?: number;
  withActiveStyle?: boolean;
};

export const LinkWithIcon: FC<LinkWithIconProps & NavLinkProps> = ({
  Icon,
  title,
  iconSize = 24,
  withActiveStyle = false,
  ...navLinkProps
}) => {
  return (
    <StyledNavLink
      $withActiveStyle={withActiveStyle}
      {...navLinkProps}>
      <Wrapper
        vertical
        gap={2}
        justify='center'
        align='center'
        style={{ width: 'max-content' }}>
        <Icon
          width={iconSize}
          height={iconSize}
        />
        {title && <Title>{title}</Title>}
      </Wrapper>
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)<{ $withActiveStyle: boolean }>`
  &.active {
    color: ${({ $withActiveStyle }) =>
      $withActiveStyle ? theme.colors.accentSecondary : 'inherit'};

    & .ant-typography {
      color: ${({ $withActiveStyle }) =>
        $withActiveStyle ? theme.colors.accentSecondary : 'inherit'};
    }
  }
`;

const Wrapper = styled(Flex)`
  &:hover {
    color: ${theme.colors.accentPrimary};

    & .ant-typography {
      color: ${theme.colors.accentPrimary};
    }
  }
`;

const Title = styled(Typography.Text)`
  font-size: 12px;
  transition: 0.8;
`;

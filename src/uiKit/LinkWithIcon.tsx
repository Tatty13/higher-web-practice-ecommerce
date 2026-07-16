import type { FC, FunctionComponent, SVGProps } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';

type LinkWithIconProps = {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  to: string;
};

export const LinkWithIcon: FC<LinkWithIconProps> = ({ Icon, title, to }) => {
  return (
    <Link to={to}>
      <Wrapper
        vertical
        justify='center'
        align='center'
        style={{ width: 'max-content' }}>
        <Icon />
        <Title>{title}</Title>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled(Flex)`
  &:hover {
    color: ${theme.colors.accentSecondary};
  }
`;

const Title = styled(Typography.Text)`
  font-size: 12px;
  transition: 0.8;
  &:hover {
    color: ${theme.colors.accentSecondary};
  }
`;

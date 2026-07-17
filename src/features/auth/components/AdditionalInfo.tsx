import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';
import { Text } from '@/uiKit';
import type { AuthLayoutProps } from '../types';

type AdditionalInfoProps = Pick<
  AuthLayoutProps,
  'additionalInfoTitle' | 'redirectLinkPath' | 'redirectLinkTitle'
>;

export const AdditionalInfo: FC<AdditionalInfoProps> = ({
  additionalInfoTitle,
  redirectLinkPath,
  redirectLinkTitle,
}) => {
  return (
    <Container vertical>
      <Text
        type='secondary'
        size={14}>
        {additionalInfoTitle}
      </Text>

      <Link to={redirectLinkPath}>
        <LinkTitle
          strong
          size={14}>
          {redirectLinkTitle}
        </LinkTitle>
      </Link>
    </Container>
  );
};

const Container = styled(Flex)`
  margin-top: 16px;
`;

const LinkTitle = styled(Text)`
  color: ${theme.colors.accentSecondary};
`;

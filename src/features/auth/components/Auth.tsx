import { Button, Flex, Typography } from 'antd';
import type { FC, JSX } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { RunnerImage } from '@/assets';
import { theme } from '@/theme/styledTheme';
import { Text } from '@/uiKit';

type AuthProps = {
  title: string;
  submitBtnText: string;
  additionalInfoTitle: string;
  redirectLinkTitle: string;
  redirectLinkPath: string;
  isLoading: boolean;
  onSubmit: () => void;
  children: JSX.Element;
};

export const Auth: FC<AuthProps> = ({
  title,
  submitBtnText,
  additionalInfoTitle,
  redirectLinkTitle,
  redirectLinkPath,
  isLoading,
  onSubmit,
  children,
}) => {
  return (
    <Wrapper>
      <Content
        vertical
        gap='large'>
        <Typography.Title
          level={2}
          style={{ margin: 0 }}>
          {title}
        </Typography.Title>

        {children}

        <Button
          type='primary'
          onClick={onSubmit}
          size='large'
          loading={isLoading}
          style={{ width: '100%' }}>
          {submitBtnText}
        </Button>

        <AdditionalInfo vertical>
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
        </AdditionalInfo>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  flex: 1;
  background: url(${RunnerImage}) center / contain no-repeat;
`;

const Content = styled(Flex)`
  width: 380px;
  margin: auto;
  padding: 24px;
  background: ${theme.colors.bgSecondary};
  border-radius: 12px;
  box-shadow: ${theme.colors.bgShadows} 0 8px 16px;
`;

const AdditionalInfo = styled(Flex)`
  margin-top: 16px;
`;

const LinkTitle = styled(Text)`
  color: ${theme.colors.accentSecondary};
`;

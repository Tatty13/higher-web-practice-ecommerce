import type { FC } from 'react';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { RunnerImage } from '@/assets';
import { Card } from '@/uiKit';

import { AdditionalInfo } from './AdditionalInfo';
import type { AuthLayoutProps } from '../types';

export const AuthLayoutDesktop: FC<AuthLayoutProps> = ({
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
        padding='large'
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

        <AdditionalInfo
          additionalInfoTitle={additionalInfoTitle}
          redirectLinkPath={redirectLinkPath}
          redirectLinkTitle={redirectLinkTitle}
        />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled(Flex)`
  flex: 1;
  background: url(${RunnerImage}) center / contain no-repeat;
`;

const Content = styled(Card)`
  width: 380px;
  margin: auto;
`;

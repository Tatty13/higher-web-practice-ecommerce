import type { FC } from 'react';
import { Button, Flex, Typography } from 'antd';
import styled from 'styled-components';

import { ROUTE_PATHS } from '@/app/paths';
import { ArrowIcon } from '@/assets';
import { LinkWithIcon } from '@/uiKit';

import { AdditionalInfo } from './AdditionalInfo';
import type { AuthLayoutProps } from '../types';

export const AuthLayoutMobile: FC<AuthLayoutProps> = ({
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
    <Content
      vertical
      justify='space-between'
      gap='large'>
      <Flex
        align='center'
        gap='small'>
        <LinkWithIcon
          to={ROUTE_PATHS.main}
          Icon={ArrowIcon}
        />
        <Typography.Title
          level={2}
          style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>

      <Flex
        vertical
        gap='middle'>
        {children}
        <Button
          type='primary'
          onClick={onSubmit}
          size='large'
          loading={isLoading}
          style={{ width: '100%' }}>
          {submitBtnText}
        </Button>
      </Flex>

      <AdditionalInfo
        additionalInfoTitle={additionalInfoTitle}
        redirectLinkPath={redirectLinkPath}
        redirectLinkTitle={redirectLinkTitle}
      />
    </Content>
  );
};

const Content = styled(Flex)`
  min-height: 100vh;
  padding: 20px;
`;

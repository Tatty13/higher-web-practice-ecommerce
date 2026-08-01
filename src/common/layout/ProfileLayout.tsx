import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import styled from 'styled-components';

import { MeditationImage } from '@/assets';
import { tokens } from '@/theme/tokens';
import utils from '@/utils';

export const ProfileLayout: FC = () => {
  const { isMobile } = utils.responsive.useResponsive();

  return (
    <Content
      vertical
      gap={16}>
      {isMobile && <Typography.Title level={2}>Мой профиль</Typography.Title>}
      <Wrapper
        vertical
        gap='middle'>
        <Outlet />
      </Wrapper>
    </Content>
  );
};

const Content = styled(Flex)`
  height: 100%;
  flex: 1;
  background: url(${MeditationImage}) right 0 bottom 0 / 60% no-repeat;

  @media screen and (${tokens.app.mediaMobileWidthM}) {
    background: none;
  }
`;

const Wrapper = styled(Flex)`
  max-width: 580px;
`;

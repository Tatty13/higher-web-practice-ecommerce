import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { MeditationImage } from '@/assets';

export const ProfileLayout: FC = () => {
  return (
    <Content vertical>
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
`;

const Wrapper = styled(Flex)`
  max-width: 580px;
`;

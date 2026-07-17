import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';
import { HeaderMobile } from '@/components/common';

export const MobileLayout: FC = () => {
  return (
    <Page vertical>
      <ContentWrapper>
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
      <HeaderWrapper>
        <HeaderMobile />
      </HeaderWrapper>
    </Page>
  );
};
const Page = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid ${theme.colors.bgShadows};
`;

const ContentWrapper = styled.div`
  overflow-y: auto;
  padding: 20px ${theme.app.sidePaddingsMobile};
  flex-grow: 1;
  background: ${theme.colors.bgPrimary};

  display: flex;
`;

const Content = styled.main`
  max-width: ${theme.app.maxwidth};
  min-height: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  flex-direction: vertical;
`;

import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';
import { HeaderDesktop } from '@/common/components';

export const DesktopLayout: FC = () => {
  return (
    <Page vertical>
      <HeaderWrapper>
        <HeaderDesktop />
      </HeaderWrapper>
      <ContentWrapper>
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </Page>
  );
};

const Page = styled(Flex)`
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  border-bottom: 1px solid ${theme.colors.bgShadows};
`;

const ContentWrapper = styled.div`
  padding: 32px ${theme.app.sidePaddingsDesktop};
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

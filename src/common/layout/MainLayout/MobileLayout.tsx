import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { theme } from '@/theme/styledTheme';
import { HeaderMobile } from '@/common/components';

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
  border-top: 1px solid ${theme.colors.bgShadows};
`;

const ContentWrapper = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  background: ${theme.colors.bgPrimary};

  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  max-width: ${theme.app.maxwidth};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding: 20px ${theme.app.sidePaddingsMobile};
`;

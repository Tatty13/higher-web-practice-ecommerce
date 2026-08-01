import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from 'antd';
import styled from 'styled-components';

import { Search } from '@/common/components/Search';
import { FixedContainer } from '@/uiKit';
import utils from '@/utils';

export const CatalogLayout: FC = () => {
  const { isMobile } = utils.responsive.useResponsive();

  if (!isMobile) {
    return <Outlet />;
  }

  return (
    <ContentContainer
      vertical
      gap='middle'>
      <FixedContainer>
        <Search />
      </FixedContainer>
      <Outlet />
    </ContentContainer>
  );
};

const ContentContainer = styled(Flex)`
  margin-top: 60px;
`;

import { Grid } from 'antd';

import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

const { useBreakpoint } = Grid;

export function MainLayout() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

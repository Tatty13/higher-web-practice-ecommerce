import utils from '@/utils';

import { DesktopLayout } from './DesktopLayout';
import { MobileLayout } from './MobileLayout';

export function MainLayout() {
  const { isMobile } = utils.responsive.useResponsive();

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

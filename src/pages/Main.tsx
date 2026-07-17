import { Catalog, CatalogMobile } from '@/features/catalog';
import utils from '@/utils';

export function MainPage() {
  const { isMobile } = utils.responsive.useResponsive();

  return isMobile ? <CatalogMobile /> : <Catalog />;
}

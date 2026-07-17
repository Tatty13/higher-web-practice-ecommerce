import { Grid } from 'antd';

const { useBreakpoint } = Grid;

export function useResponsive() {
  const screens = useBreakpoint();

  return {
    isMobile: !screens.md,
  };
}

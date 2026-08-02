import { renderHook } from '@testing-library/react';
import { useResponsive } from './responsive';

const mockUseBreakpoint = jest.fn();

jest.mock('antd', () => ({
  Grid: {
    useBreakpoint: () => mockUseBreakpoint(),
  },
}));

describe('useResponsive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Возвращает isMobile=true, когда значение md равно false', () => {
    mockUseBreakpoint.mockReturnValue({ md: false });

    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({ isMobile: true });
  });

  it('Возвращает isMobile=true, если значение md undefined', () => {
    mockUseBreakpoint.mockReturnValue({});

    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({ isMobile: true });
  });

  it('Возвращает isMobile=false при значении md true', () => {
    mockUseBreakpoint.mockReturnValue({ md: true });

    const { result } = renderHook(() => useResponsive());
    expect(result.current).toEqual({ isMobile: false });
  });
});

import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

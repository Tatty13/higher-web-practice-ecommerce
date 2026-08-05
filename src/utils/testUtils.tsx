import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/' }: { route?: string } = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
  );

  return render(ui, { wrapper: Wrapper });
};

type RenderAppOptions = {
  initialRoute?: string;
  registrationElement?: ReactNode;
  loginElement?: ReactNode;
  mainElement?: ReactNode;
};

export const renderAuthApp = ({
  initialRoute = '/',
  registrationElement,
  loginElement,
  mainElement,
}: RenderAppOptions) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  );

  return render(
    <Routes>
      <Route
        path='/registration'
        element={registrationElement}
      />
      <Route
        path='/login'
        element={loginElement}
      />
      <Route
        path='/main'
        element={mainElement}
      />
    </Routes>,
    { wrapper: Wrapper },
  );
};

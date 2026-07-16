import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import '@ant-design/v5-patch-for-react-19';

import { App } from './app/App';
import { ErrorBoundary } from './components/common';
import { AntConfigProvider } from './theme/AntConfig';
import { theme } from './theme/styledTheme';
import { store } from './store';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <AntConfigProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </AntConfigProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

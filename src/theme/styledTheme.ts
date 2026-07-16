import { createTheme } from 'styled-components';

import { tokens } from './tokens';

export const theme = createTheme({
  colors: tokens.colors,
  app: tokens.app,
});

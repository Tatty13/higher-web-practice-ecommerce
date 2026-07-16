import type { FC, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

import { tokens } from './tokens';

type AntConfigProps = {
  children: ReactNode;
};

export const AntConfigProvider: FC<AntConfigProps> = ({ children }) => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: tokens.colors.accentPrimary,
          colorText: tokens.colors.neutralPrimary,
          colorLink: tokens.colors.accentSecondary,
          colorSplit: tokens.colors.bgShadows,
          colorSuccess: tokens.colors.success,
          colorBorder: tokens.colors.neutralDisable,

          fontFamily: tokens.typography.fontFamily,
          fontSize: tokens.typography.fontSize,
          fontSizeHeading1: tokens.typography.fontSizeHeading1,
          fontSizeHeading2: tokens.typography.fontSizeHeading2,
          fontSizeHeading3: tokens.typography.fontSizeHeading3,
          fontSizeHeading4: tokens.typography.fontSizeHeading4,
          lineHeightHeading1: tokens.typography.lineHeightHeading1,
          lineHeightHeading2: tokens.typography.lineHeightHeading2,
          lineHeightHeading3: tokens.typography.lineHeightHeading3,
          lineHeightHeading4: tokens.typography.lineHeightHeading4,
        },
        components: {
          Button: {
            defaultBorderColor: tokens.colors.accentPrimary,
            defaultColor: tokens.colors.accentPrimary,
          },
          Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
          },
        },
      }}>
      {children}
    </ConfigProvider>
  );
};

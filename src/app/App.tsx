'use client';

import { ThemeProvider } from '@lobehub/ui';
import { App } from 'antd';
import { useTheme } from 'antd-style';
import { PropsWithChildren } from 'react';

const Wrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  return (
    <App style={{ background: theme.colorBgLayout, height: '100%', minHeight: '100vh' }}>
      {children}
    </App>
  );
};

export default ({ children }: PropsWithChildren) => (
  <ThemeProvider themeMode={'auto'}>
    <Wrapper>{children}</Wrapper>
  </ThemeProvider>
);

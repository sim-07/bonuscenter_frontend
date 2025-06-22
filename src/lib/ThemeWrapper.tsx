"use client";

import * as React from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from '../lib/createEmotionCache';
import theme from './theme';

const clientSideEmotionCache = createEmotionCache();

interface ThemeWrapperProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

export default function ThemeWrapper(props: ThemeWrapperProps) {
  const { emotionCache = clientSideEmotionCache, children } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

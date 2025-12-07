import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { appWithTranslation } from 'next-i18next'
import createEmotionCache from "../src/lib/createEmotionCache";
import ThemeWrapper from "../src/lib/ThemeWrapper";
import nextI18NextConfig from '../next-i18next.config';

import '@/i18n';

const clientSideCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideCache }: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp)

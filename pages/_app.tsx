import * as React from "react";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/lib/createEmotionCache";
import ThemeWrapper from "../src/lib/ThemeWrapper";

const clientSideCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({ Component, pageProps, emotionCache = clientSideCache }: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </CacheProvider>
  );
}

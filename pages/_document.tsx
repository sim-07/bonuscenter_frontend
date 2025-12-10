import * as React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/lib/createEmotionCache';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
      });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        ...emotionStyles.styles.map(style => (
          <style
            key={style.key}
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: style.css }}
          />
        )),
      ],
    };
  }

  render() {
    const locale = this.props.__NEXT_DATA__.locale || 'it';
    return (
      <Html lang={locale}>
        <Head>
          <meta name="description" content="Condividi codici referral e guadagna online in modo veloce e senza rischi" />
          <link rel="icon" href="/favicon.ico" />
          <script
            defer
            src="https://cdn.counter.dev/script.js"
            data-id="3992b468-b688-4164-9971-34499a6fdef1"
            data-utcoffset="2"
          />        </Head>
        <body style={{ backgroundColor: '#212121' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
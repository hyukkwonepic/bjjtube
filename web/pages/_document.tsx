import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MaterialSheet } from '@material-ui/styles';
import { ServerStyleSheet as StyledComponentSheet } from 'styled-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../components/GlobalStyles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const materialSheet = new MaterialSheet();
    const styledComponentsSheet = new StyledComponentSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            materialSheet.collect(
              styledComponentsSheet.collectStyles(
                <>
                  <CssBaseline />
                  <GlobalStyles />
                  <App {...props} />
                </>
              )
            )
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheet.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        )
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,700,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

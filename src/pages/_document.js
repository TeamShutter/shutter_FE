import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
          <Head>
            <meta name="keywords" content="셔터, Shutter, shutter, 증명사진, 프로필사진, 사진관, 스튜디오" />
            <meta name="description" content="인생 사진관을 위한 플랫폼, 셔터 (Shutter). 당신에게 꼭 맞는 스튜디오를 찾아보세요." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="셔터 (Shutter)" />
            <meta property="og:description"  content="증명사진 플랫폼, 셔터 (Shutter). 당신에게 꼭 맞는 스튜디오를 찾아보세요." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://takeshutter.co.kr/" />
            <meta property="og:image" content="/static/logo_icon.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="60x60" href="/static/favicon-60x60.png" />
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  const materialSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => materialSheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>
  };
};
import DefaultDocument, { Head, Main, NextScript, Html } from 'next/document';

class Document extends DefaultDocument {
  render() {
    return (
      <Html lang="no">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

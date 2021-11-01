import DefaultDocument, { Head, Main, NextScript, Html } from 'next/document';

import { CHROMECAST_APP_ID } from 'common/constants';

class Document extends DefaultDocument {
  render() {
    return (
      <Html lang="no">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window['__onGCastApiAvailable'] = function(isAvailable) {
                if (isAvailable) {
                  initializeCastApi();
                }
              };
          `,
            }}
          />
          <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              initializeCastApi = function() {
                  cast.framework.CastContext.getInstance().setOptions({
                    receiverApplicationId: "${CHROMECAST_APP_ID}",
                    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
                  });
                };
              `,
            }}
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

export default Document;

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return ( 
      <Html lang="en">
           <Script
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '689405399107163'); 
    fbq('track', 'PageView');
       
   
    fbq('track', 'AddPaymentInfo');
    fbq('track', 'AddToCart');
    fbq('track', 'AddToWishlist');
    fbq('track', 'CompleteRegistration');
    fbq('track', 'Contact');
    fbq('track', 'CustomizeProduct');
    fbq('track', 'Donate');
    fbq('track', 'FindLocation');
    fbq('track', 'InitiateCheckout');
    fbq('track', 'Lead');
    fbq('track', 'Schedule');
    fbq('track', 'Search');
    fbq('track', 'SubmitApplication');
    fbq('track', 'ViewContent');
  `,
  }}
/>
<noscript>
            <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=689405399107163&ev=PageView&noscript=1`}/>
</noscript>

      <noscript>
      <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=PageView&noscript=1"/>
      <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=AddToCart&noscript=1"/>
</noscript>

        <Head>
        <noscript>
            <img height="1" width="1" style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=689405399107163&ev=PageView&noscript=1`}/>
</noscript>

      <noscript>
      <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=PageView&noscript=1"/>
      <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=AddToCart&noscript=1"/>
</noscript>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
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

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

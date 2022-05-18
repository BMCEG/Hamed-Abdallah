import { SnackbarProvider } from 'notistack';
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Script from 'next/script';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { HamedAbdallahNav, HamedAbdallahFooter } from '../components/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StoreProvider } from '../utils/Store';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
      <Script
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', 'GTM-XXXXXX');
  `,
  }}
/>
      <noscript>
 <img height="1" width="1" 
src="https://www.facebook.com/tr?id=689405399107163&ev=PageView
&noscript=1"/>
</noscript>
        <title>Hamed Abdallah Optics</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <StoreProvider>
            <HamedAbdallahNav />
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
            <HamedAbdallahFooter />
          </StoreProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

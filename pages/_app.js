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
      <Script strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
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
 <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=PageView&noscript=1"/>
 <img height="1" width="1" src="https://www.facebook.com/tr?id=689405399107163&ev=AddToCart&noscript=1"/>

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

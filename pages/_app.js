import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { ThemeProvider } from '@mui/material';
import { MuiThemeProvider, ThemeProvider } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import LoadingMain from '@components/General/LoadingMain';

// Import Redux Library
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import theme from '../src/theme';
import { useStore } from '../src/redux/store';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  // initialize persistor
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });

  // const checkAuth = () => {
  //   let user = null;
  //   if (typeof window !== 'undefined') {
  //     user = localStorage.getItem('user');
  //   }

  //   if (user === null) {
  //     router.push('/login');
  //   } else {
  //     router.push(router.pathname);
  //   }
  // };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // checkAuth();
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Deteksi Tweet</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <Provider store={store}>
        <PersistGate
          loading={<LoadingMain />}
          persistor={persistor}
          // eslint-disable-next-line no-promise-executor-return
          onBeforeLift={() => new Promise((resolve) => setTimeout(resolve, 3000))}
        >
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <MuiThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
              </MuiThemeProvider>
            </ThemeProvider>
          </StylesProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

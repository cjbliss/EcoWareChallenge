import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';
import { Catamaran, Knewave } from 'next/font/google';
import Layout from "@/components/Layout";



const catamaran = Catamaran({
    subsets: ["latin"],
    weights: ['400', '500', '600', '700'],
});

const knewave = Knewave({
    subsets: ['latin'], // Choose the character subset you need
    weight: '400',      // Specify the weight (Knewave only supports 400)
});

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (


    <React.Fragment>
      <Head>
        <title>Vendor Management System</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
          <main className={catamaran.className}>
              <Layout>
                 <Component {...pageProps} />
              </Layout>
          </main>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

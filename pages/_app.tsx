import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';

import Layout from '@/components/layout/Layout';
import '@/styles/global.css';
import Head from 'next/head';

const font = Nunito({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Head>
        <title>Car Rentals - Car Rental</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

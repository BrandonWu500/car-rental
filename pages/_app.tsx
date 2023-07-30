import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import Head from 'next/head';

import Layout from '@/components/layout/Layout';

import '@/styles/global.css';
import Script from 'next/script';

const font = Nunito({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Head>
        <title>Car Rentals - Car Rental</title>
        <meta
          name="description"
          content="Rent cars listed by other users or list your own cars for other users to rent"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </div>
  );
}

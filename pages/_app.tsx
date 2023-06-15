import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";

import "@/styles/global.css";

const font = Nunito({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}

import '@/styles/globals.css'
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";

import { trpc } from "@/utils/trpc";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)
  
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: any) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);

import type { AppProps } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";

import { trpc } from "@/utils/trpc";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }: any) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);

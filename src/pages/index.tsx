import Head from 'next/head'

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/sign-in");
    }
  }, [router, session, status]);

  return (
    <main>
      <Head>
        <title>Realtime chat</title>
      </Head>
    </main>
  )
}

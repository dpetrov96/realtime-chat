import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});


export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/sign-in");
    }
  }, [router, session, status]);

  return (
    <main>
      <Head>
        <title>Realtime chat</title>
      </Head>
      <div className="flex">
        <GroupsList />
      </div>
    </main>
  )
}

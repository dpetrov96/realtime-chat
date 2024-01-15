import { useEffect, ReactElement } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import MessagesLayout from '@/layouts/MessagesLayout';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/sign-in");
    }
  }, [router, session, status]);

  return (
    <>
      <Head>
        <title>Realtime chat</title>
      </Head>
      <div>
        dasda22
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MessagesLayout>
      {page}
    </MessagesLayout>
  )
}

export default Home;

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
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please select group</h2>
          <p className="text-gray-500">Choose from your existing groups or create a new one</p>
        </div>
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

import { useEffect } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

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
        <title>Team GPT Chat</title>
      </Head>
      <Header />
      <main className="flex w-full h-[calc(100vh-theme(space.14))] mt-14">
        <div className="w-full md:w-[300px] h-full border-r border-gray-200">
          <GroupsList />
        </div>
        <div className="hidden md:flex w-[calc(100%-300px)] h-full">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Please select group</h2>
              <p className="text-gray-500">Choose from your existing groups or create a new one</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;

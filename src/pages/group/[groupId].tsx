import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

const Messages = dynamic(() => import("@/components/Messages/index"), {
  ssr: false,
});

const GroupPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const groupId = `${params?.groupId}`;

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
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div className="hidden md:flex w-[calc(100%-300px)] h-full">
          <Messages groupId={groupId} />
        </div>
      </main>
    </>
  )
}

export default GroupPage;

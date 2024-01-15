import { useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

const Messages = dynamic(() => import("@/components/Messages/index"), {
  ssr: false,
});


export default function Group() {
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
    <main>
      <Head>
        <title>Realtime chat</title>
      </Head>
      <div className="flex">
        <div className="w-[300px] h-screen border-r border-gray-300">
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div className="w-[calc(100%-300px)] h-screen">
          <Messages groupId={groupId} />
        </div>
      </div>
    </main>
  )
}

import { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation'
import MessagesLayout from '@/layouts/MessagesLayout';

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
        <title>Realtime chat</title>
      </Head>
      <Messages groupId={groupId} />
    </>
  )
}

GroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MessagesLayout>
      {page}
    </MessagesLayout>
  )
}

export default GroupPage;

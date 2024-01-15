import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const groupId = `${params?.groupId}`;

  return (
    <main>
      <Header />
      <div className="messages-layout">
        <div className="left-sidebar">
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    </main>
  )
}

export default MessagesLayout;


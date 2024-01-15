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
      <div style={{ display: "flex", width: "100%", height: "calc(100vh - 60px)", marginTop: 60 }}>
        <div style={{ width: 300, height: "100%" }} className="border-r border-gray-200">
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div style={{ width: "calc(100% - 300px)", height: "100%" }}>
          {children}
        </div>
      </div>
    </main>
  )
}

export default MessagesLayout;


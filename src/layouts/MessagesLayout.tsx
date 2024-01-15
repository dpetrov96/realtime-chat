import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
});

const HEADER_HEIGHT = 58;
const SIDEBAR_WIDTH = 300;

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const groupId = `${params?.groupId}`;

  return (
    <main>
      <Header />
      <div style={{ display: "flex", width: "100%", height: `calc(100vh - ${HEADER_HEIGHT}px)`, marginTop: HEADER_HEIGHT }}>
        <div style={{ width: SIDEBAR_WIDTH, height: "100%", borderRight: "1px solid rgb(229, 231, 235)" }}>
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div style={{ width: `calc(100% - ${SIDEBAR_WIDTH}px)`, height: "100%" }}>
          {children}
        </div>
      </div>
    </main>
  )
}

export default MessagesLayout;


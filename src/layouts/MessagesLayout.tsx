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
      <div style={{ height: "calc(100vh - 60px)", marginTop: 60 }} className="flex w-full">
        <div className="w-[300px] h-full border-r border-gray-200">
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div className="w-[calc(100%-300px)] h-full">
          {children}
        </div>
      </div>
    </main>
  )
}

export default MessagesLayout;


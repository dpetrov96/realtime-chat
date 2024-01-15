import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation'

const GroupsList = dynamic(() => import("@/components/GroupsList"), {
  ssr: false,
});

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const groupId = `${params?.groupId}`;

  return (
    <main>
      <div className="flex">
        <div className="w-[300px] h-screen border-r border-gray-200">
          <GroupsList selectedGroupId={groupId} />
        </div>
        <div className="w-[calc(100%-300px)] h-screen">
          {children}
        </div>
      </div>
    </main>
  )
}

export default MessagesLayout;


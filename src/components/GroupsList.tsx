import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';

import { trpc } from '@/utils/trpc';
import { Dialog, CreateGroupForm } from '@/components';
import { NewMessageIcon } from '@/icons';

type Props = {
  selectedGroupId?: string;
}

const GroupsList = ({ selectedGroupId }: Props) => {
  const router = useRouter();
  const [createNewIsOpen, setCreateNewIsOpen] = useState(false);
  const { data: groups, refetch: refetchGroups } = trpc.roomRouter.getGroups.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  return(
    <div className="relative flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full overflow-y-auto">
        {groups?.map(({ _id, name, lastMessage }) => {
          const groupId = `${_id}`;
          const isActive = selectedGroupId === groupId;

          return (
            <div
              key={`${groupId}-${name}`}
              onClick={() => router.push(`/group/${groupId}`)}
              className={clsx("flex px-4 py-3 border-b border-gray-200", isActive ? "bg-gray-100 cursor-default" : "cursor-pointer")}
            >
              <div className="w-[40px]">
                <Avatar name={name} size="40" round />
              </div>
              <div className="w-[calc(100%-40px)] pl-4">
                <p className="font-bold text-sm truncate mb-1">{name}</p>
                <p className="italic text-xs text-gray-500 truncate">{lastMessage || "No messages"}</p>
              </div>
            </div>
          )
        })}
      </div>
      <button
        className="w-full flex items-center gap-3 justify-center left-0 bottom-0 bg-white p-4 border-t border-t-gray-200 font-semibold text-indigo-600 hover:text-indigo-500 hover:bg-gray-200 transition-all"
        onClick={() => setCreateNewIsOpen(true)}
      >
        <NewMessageIcon className="w-5 h-5" /> Create Group
      </button>
      <Dialog
        title="Create Group"
        isOpen={createNewIsOpen}
        onClose={() => setCreateNewIsOpen(false)}
      >
        <CreateGroupForm
          onCreateGroup={() => {
            refetchGroups();
            setCreateNewIsOpen(false);
          }}
        />
      </Dialog>
    </div>
  );
}

export default GroupsList


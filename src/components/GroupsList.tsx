import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';

import { trpc } from '@/utils/trpc';
import { Button, Dialog, CreateGroupForm } from '@/components';

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
    <div>
      <div>
        <button
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            onClick={() => setCreateNewIsOpen(true)}
          >
            Create Group
        </button>
      </div>
      <div className="flex flex-col w-full">
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
                <p className="italic text-xs text-gray-500 truncate">{lastMessage}</p>
              </div>
            </div>
          )
        })}
      </div>
      <Dialog title="Create Group" isOpen={createNewIsOpen}>
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


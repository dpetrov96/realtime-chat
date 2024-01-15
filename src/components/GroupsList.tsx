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
        <Button onClick={() => setCreateNewIsOpen(true)}>Create new group</Button>
      </div>
      <div className="flex flex-col w-full">
        {groups?.map(({ _id, name, lastMessage }) => {
          const groupId = `${_id}`;
          const isActive = selectedGroupId === groupId;

          return (
            <div
              key={`${groupId}-${name}`}
              onClick={() => router.push(`/${groupId}`)}
              className={clsx("flex gap-4 px-4 py-2 border-b border-gray-200", isActive ? "bg-gray-100" : "cursor-pointer")}
            >
              <div>
                <Avatar name={name} size="40" round />
              </div>
              <div>
                <p>{name}</p>
                <p>{lastMessage}</p>
              </div>
            </div>
          )
        })}
      </div>
      <Dialog title="Create new group" isOpen={createNewIsOpen}>
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


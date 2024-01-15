import { useState } from 'react';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';

import { trpc } from '@/utils/trpc';
import { Button, Dialog, CreateGroupForm } from '@/components';

type Props = {
  selectedGroupId?: string;
  onSelectGroup?: (groupId: string) => void;
}

const GroupsList = ({ onSelectGroup, selectedGroupId }: Props) => {
  const router = useRouter();
  const [createNewIsOpen, setCreateNewIsOpen] = useState(false);
  const { data: groups, refetch: refetchGroups } = trpc.roomRouter.getGroups.useQuery(undefined, {
    refetchOnWindowFocus: true,
  });

  return(
    <div>
      {groups?.map(({ _id, name, lastMessage }) => {
        const groupId = `${_id}`;
        return (
          <div
            key={`${groupId}-${name}`}
            style={{ backgroundColor: selectedGroupId === `${_id}` ? "blue" : "transparent" }}
            onClick={() => router.push(`/${groupId}`)}
            className="flex gap-2"
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
      <Button onClick={() => setCreateNewIsOpen(true)}>Create new group</Button>
      <Dialog isOpen={createNewIsOpen}>
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

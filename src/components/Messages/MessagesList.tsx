import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Avatar from 'react-avatar';

import { useUser } from '@/hooks';
import { trpc } from '@/utils/trpc';

type Props = {
  groupId: string;
}

const MessagesList = ({ groupId }: Props) => {
  const sessionUser = useUser();

  const { data: messages } = trpc.messageRouter.getMessages.useQuery(
    {
      groupId: groupId,
    },
    { refetchOnWindowFocus: true },
  );

  const utils = trpc.useUtils();

  trpc.roomRouter.onSendMessage.useSubscription(
    { groupId: groupId },
    {
      onData(data: { groupId: string; text: string }) {
        console.log(data);
        utils.messageRouter.getMessages.invalidate();
        utils.roomRouter.getGroups.invalidate();
      },
      onError(err: any) {
        console.error("Subscription error:", err);
        // we might have missed a message - invalidate cache
        utils.messageRouter.getMessages.invalidate();
      },
    },
  );

  return Boolean(messages?.length) ? (
    <div className="h-full overflow-y-auto p-4 pb-0">
      {messages?.map(({ text, userId, email, createdAt }, index) => {
        const isMe: boolean = sessionUser?.id === userId.toString();

        return (
          <div
            key={`${index}+${createdAt}`}
            className={clsx(
              "mb-4 flex justify-end",
              !isMe && "flex-row-reverse",
            )}
          >
            <div
              className={twMerge(
                clsx(
                  "mr-2 rounded-bl-3xl rounded-br-xl rounded-tl-3xl bg-indigo-600 px-4 py-3 text-white",
                  !isMe &&
                    "m-0 ml-2 rounded-bl-xl rounded-br-3xl rounded-tl-none rounded-tr-3xl bg-gray-400",
                ),
              )}
            >
              {text}
            </div>
            <Avatar name={email} size='40' round />
          </div>
        );
      })}
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-600">Send a first message...</h2>
    </div>
  );
}

export default MessagesList;

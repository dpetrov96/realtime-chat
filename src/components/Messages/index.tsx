import MessagesList from './MessagesList';
import SendMessageForm from './SendMessageForm';

type Props = { groupId: string }

const Messages = ({ groupId }: Props) => (
  <div className="flex flex-col justify-between w-full h-full">
    <MessagesList groupId={groupId} />
    <SendMessageForm groupId={groupId} />
  </div>
)

export default Messages;

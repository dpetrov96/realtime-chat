import { useState } from 'react';

import { useUser } from '@/hooks';
import { SendIcon } from '@/icons';
import { trpc } from '@/utils/trpc';

const SendMessagesForm = ({ groupId }: { groupId: string }) => {
  const sessionUser = useUser();
  const [message, setMessage] = useState('');

  const { mutateAsync: sendMessage } = trpc.roomRouter.sendMessage.useMutation();

  const onSendMessage = () => {
    if (message && sessionUser?.id) {
      sendMessage({
          text: message,
          groupId,
      });

      setMessage('');
    }
  };

  return (
    <div className="flex items-center gap-4 px-4">
      <div className="my-3 flex-grow">
        <textarea
          rows={2}
          name="message"
          id="message"
          className="p-2 block w-full resize-none overflow-hidden rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="type your message here..."
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="p-1.5 aspect-square rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onSendMessage} 
      >
        <SendIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SendMessagesForm;

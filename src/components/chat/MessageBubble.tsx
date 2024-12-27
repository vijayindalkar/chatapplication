import { type FC } from 'react';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { CheckCheck } from 'lucide-react';
import type { Message } from '../../context/ChatContext';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message, isOwn }) => {
  // Function to determine class based on message length
  const getMessageSizeClass = (messageLength: number) => {
    if (messageLength < 20) return 'max-w-xs';  // Short messages
    else if (messageLength < 50) return 'max-w-sm';  // Medium messages
    else return 'max-w-md';  // Long messages
  };

  const messageSizeClass = getMessageSizeClass(message.content.length);

  return (
    <div
      className={clsx(
        'flex flex-col gap-1',
        isOwn ? 'ml-auto' : 'mr-auto',
        messageSizeClass  // Apply dynamic sizing class
      )}
    >
      <div
        className={clsx(
          'rounded-2xl px-4 py-2',
          isOwn ? 'bg-green-500 text-white' : 'bg-white'
        )}
      >
        <p className="break-words">{message.content}</p>
      </div>
      <div
        className={clsx(
          'flex items-center gap-1 text-xs',
          isOwn ? 'ml-auto text-gray-200' : 'text-gray-500'
        )}
      >
        <span>{format(message.timestamp, 'HH:mm')}</span>
        {isOwn && (
          <CheckCheck className="h-4 w-4" />
        )}
      </div>
    </div>
  );
};

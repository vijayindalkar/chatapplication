import { type FC, useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
}

export const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4">
      <div className="flex items-end gap-2 rounded-lg bg-white p-2 shadow-sm">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          aria-label="Add attachment"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          rows={1}
          className="flex-1 resize-none bg-transparent py-1 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        
        <button
          type="button"
          className="text-gray-500 hover:text-gray-600"
          aria-label="Add emoji"
        >
          <Smile className="h-5 w-5 mb-2" />
        </button>
        
        <button
          type="submit"
          className="rounded-full bg-green-500 p-2 text-white transition-colors hover:bg-green-600"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
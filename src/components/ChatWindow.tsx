import { type FC } from 'react';
import { useChat } from '../context/ChatContext';
import { MessageBubble } from './chat/MessageBubble';
import { MessageInput } from './chat/MessageInput';
import { Avatar } from './ui/Avatar';
import { Phone, Video, MoreVertical } from 'lucide-react';

export const ChatWindow: FC = () => {
  const { state, sendMessage } = useChat();

  if (!state.selectedContact) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-200">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Welcome to WhatsApp</h2>
          <p className="mt-2 text-gray-500">Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  const messages = state.messages[state.selectedContact.id] || [];

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between bg-gray-50 px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar
            src={state.selectedContact.avatar}
            alt={state.selectedContact.name}
            online
          />
          <div>
            <h2 className="font-semibold">{state.selectedContact.name}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Video className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <Phone className="h-5 w-5" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div 
        className="flex-1 overflow-y-auto bg-[#efeae2] bg-opacity-50 p-4 space-y-4"
        style={{
          backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"
        }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === 'current-user'}
          />
        ))}
      </div>

      <MessageInput onSend={(content) => sendMessage(content, state.selectedContact!.id)} />
    </div>
  );
};
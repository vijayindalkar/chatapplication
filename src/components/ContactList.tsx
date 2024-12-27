import { type FC } from 'react';
import { Search } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { Avatar } from './ui/Avatar';

export const ContactList: FC = () => {
  const { state, dispatch } = useChat();

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-b bg-gray-50 p-4">
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="flex-1 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {state.contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => dispatch({ type: 'SELECT_CONTACT', payload: contact })}
            className={`flex w-full items-center gap-4 border-b p-4 transition-colors hover:bg-gray-50 ${
              state.selectedContact?.id === contact.id ? 'bg-gray-100' : ''
            }`}
          >
            <Avatar src={contact.avatar} alt={contact.name} online={Math.random() > 0.5} />
            
            <div className="flex-1 text-left">
              <div className="flex justify-between">
                <h3 className="font-semibold">{contact.name}</h3>
                {contact.lastMessageTime && (
                  <span className="text-sm text-gray-500">
                    {new Date(contact.lastMessageTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
              {contact.lastMessage && (
                <p className="text-sm text-gray-500 line-clamp-1">
                  {contact.lastMessage}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
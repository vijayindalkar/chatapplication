import { ChatProvider } from './context/ChatContext';
import { ContactList } from './components/ContactList';
import { ChatWindow } from './components/ChatWindow';

function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-100">
        <div className="w-[400px] border-r shadow-sm">
          <ContactList />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
}

export default App;
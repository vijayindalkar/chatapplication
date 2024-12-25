/* eslint-disable */
import React from 'react';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import { useChat } from './contexts/ChatContext';

function App() {
    const { state } = useChat();

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-100 overflow-y-auto">
                <ContactList />
            </div>
            <div className="w-3/4 flex flex-col">
                {state.selectedContactId ? (
                    <ChatWindow />
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Select a contact to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

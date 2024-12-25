/* eslint-disable */
import React from 'react';
import { useChat } from '../contexts/ChatContext';
import Message from './Message';
import MessageInput from './MessageInput';



function ChatWindow() {
    const { state } = useChat();
    const messages = state.messages[state.selectedContactId] || [];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto p-4">
                {messages.map((msg, index) => (
                    <Message key={index} data={msg} />
                ))}
            </div>
            <MessageInput />
        </div>
    );
}

export default ChatWindow;

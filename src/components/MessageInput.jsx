/* eslint-disable */
import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import db from '../services/instantDB';

function MessageInput() {
    const [text, setText] = useState('');
    const { state } = useChat();

    const sendMessage = async () => {
        if (text.trim()) {
            await db.sendMessage(state.selectedContactId, {
                text,
                sender: 'me',
                timestamp: Date.now(),
            });
            setText('');
        }
    };

    return (
        <div className="p-4">
            <input
                type="text"
                className="w-full p-2 border rounded-full"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
        </div>
    );
}

export default MessageInput;

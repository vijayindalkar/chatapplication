/* eslint-disable */
import React from 'react';

function Message({ data }) {
    const isMe = data.sender === 'me';
    return (
        <div className={`p-2 my-1 ${isMe ? 'text-right' : 'text-left'}`}>
            <span className={`p-2 rounded-lg ${isMe ? 'bg-green-200' : 'bg-gray-200'}`}>
                {data.text}
            </span>
        </div>
    );
}

export default Message;


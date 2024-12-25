/* eslint-disable */
import React from 'react';
import { useChat } from '../contexts/ChatContext';

function ContactList() {
    const { state, dispatch } = useChat();

    return (
        <div>
            {state.contacts.map((contact) => (
                <div
                    key={contact.id}
                    onClick={() => dispatch({ type: 'SELECT_CONTACT', payload: contact.id })}
                    className="p-4 cursor-pointer hover:bg-gray-200"
                >
                    {contact.name}
                </div>
            ))}
        </div>
    );
}

export default ContactList;

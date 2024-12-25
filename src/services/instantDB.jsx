// import { init } from '@instantdb/react';

// const APP_ID = 'bbc85370-19cb-4e77-acad-8a3b35fa7c31'; 
// const db = init({ appId: APP_ID });



const mockContacts = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
];

const mockMessages = {
    '1': [
        { id: 'm1', text: 'Hello, Alice!', sender: 'me', timestamp: Date.now() },
        { id: 'm2', text: 'Hi there!', sender: 'Alice', timestamp: Date.now() },
    ],
    '2': [
        { id: 'm3', text: 'Hey Bob, how are you?', sender: 'me', timestamp: Date.now() },
        { id: 'm4', text: 'I am good, how about you?', sender: 'Bob', timestamp: Date.now() },
    ],
    '3': [
        { id: 'm5', text: 'Hi Charlie!', sender: 'me', timestamp: Date.now() },
        { id: 'm6', text: 'Hello!', sender: 'Charlie', timestamp: Date.now() },
    ],
};

export default {
    fetchContacts: async () => {
        // Simulate an async operation (e.g., fetching from a server)
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockContacts), 500); // Simulate a 500ms delay
        });
    },
    fetchMessages: async (contactId) => {
        // Simulate fetching messages for a specific contact
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockMessages[contactId] || []), 500); // Simulate a 500ms delay
        });
    },
    sendMessage: async (contactId, message) => {
        // Add a new message to the mockMessages object
        if (!mockMessages[contactId]) {
            mockMessages[contactId] = [];
        }
        mockMessages[contactId].push({ ...message, id: `m${Date.now()}` });

        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 200); // Simulate a 200ms delay
        });
    },
};
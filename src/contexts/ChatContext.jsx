/* eslint-disable */
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import db from '../services/instantDB'; // Import updated InstantDB service

// Create ChatContext
const ChatContext = createContext();

// Initial State
const initialState = {
    contacts: [], // List of contacts
    messages: {}, // Messages by contactId
    selectedContactId: null, // Currently selected contact
};

// Reducer to handle state updates
function chatReducer(state, action) {
    switch (action.type) {
        case 'SET_CONTACTS': // Set contacts list
            return { ...state, contacts: action.payload };
        case 'SET_MESSAGES': // Set messages for a contact
            return { ...state, messages: { ...state.messages, [action.contactId]: action.payload } };
        case 'SELECT_CONTACT': // Select a specific contact
            return { ...state, selectedContactId: action.payload };
        default:
            return state;
    }
}

// ChatProvider Component
export function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Fetch contacts on app initialization
    useEffect(() => {
        async function loadContacts() {
            try {
                const contacts = await db.fetchContacts(); // Fetch contacts using InstantDB
                dispatch({ type: 'SET_CONTACTS', payload: contacts });
            } catch (error) {
                console.error('Failed to fetch contacts:', error);
            }
        }
        loadContacts();
    }, []);

    // Fetch messages when a contact is selected
    useEffect(() => {
        async function loadMessages() {
            if (state.selectedContactId) {
                try {
                    const messages = await db.fetchMessages(state.selectedContactId); // Fetch messages for the selected contact
                    dispatch({
                        type: 'SET_MESSAGES',
                        contactId: state.selectedContactId,
                        payload: messages,
                    });
                } catch (error) {
                    console.error('Failed to fetch messages:', error);
                }
            }
        }
        loadMessages();
    }, [state.selectedContactId]); // Trigger this effect whenever the selected contact changes

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}

// Custom hook to use ChatContext
export function useChat() {
    return useContext(ChatContext);
}

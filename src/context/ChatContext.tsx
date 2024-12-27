import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getMessages, saveMessage, getContacts } from '../lib/db';
import { fetchContacts } from '../services/contactService';

export type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
};

export type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: number;
};

type State = {
  contacts: Contact[];
  messages: Record<string, Message[]>;
  selectedContact: Contact | null;
  loading: boolean;
};

type Action =
  | { type: 'SET_CONTACTS'; payload: Contact[] }
  | { type: 'SET_MESSAGES'; payload: { contactId: string; messages: Message[] } }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SELECT_CONTACT'; payload: Contact }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: State = {
  contacts: [],
  messages: {},
  selectedContact: null,
  loading: true,
};

function chatReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CONTACTS':
      return { ...state, contacts: action.payload };
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.contactId]: action.payload.messages,
        },
      };
    case 'ADD_MESSAGE':
      const contactId = action.payload.receiverId;
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), action.payload],
        },
      };
    case 'SELECT_CONTACT':
      return { ...state, selectedContact: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

type ChatContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  sendMessage: (content: string, receiverId: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Try to load contacts from IndexedDB first
        let contacts = await getContacts();

        // If no contacts in IndexedDB or online, fetch from Supabase
        if (contacts.length === 0 || navigator.onLine) {
          contacts = await fetchContacts();
        }

        dispatch({ type: 'SET_CONTACTS', payload: contacts });

        // Subscribe to new messages
        const channel = supabase
          .channel('messages')
          .on('INSERT', payload => {
            const message = payload.new as Message;
            dispatch({ type: 'ADD_MESSAGE', payload: message });
            saveMessage(message);
          })
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadInitialData();
  }, []);

  const sendMessage = async (content: string, receiverId: string) => {
    const message = {
      id: crypto.randomUUID(),
      content,
      senderId: 'current-user', // In a real app, this would come from auth
      receiverId,
      timestamp: Date.now(),
    };

    await supabase.from('messages').insert([message]);
    dispatch({ type: 'ADD_MESSAGE', payload: message });
    await saveMessage(message);
  };

  return (
    <ChatContext.Provider value={{ state, dispatch, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
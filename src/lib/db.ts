import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface WhatsAppDB extends DBSchema {
  messages: {
    key: string;
    value: {
      id: string;
      content: string;
      senderId: string;
      receiverId: string;
      timestamp: number;
    };
    indexes: { 'by-conversation': [string, string] };
  };
  contacts: {
    key: string;
    value: {
      id: string;
      name: string;
      avatar: string;
      lastMessage?: string;
      lastMessageTime?: number;
    };
  };
}

let db: IDBPDatabase<WhatsAppDB>;

export async function initDB() {
  db = await openDB<WhatsAppDB>('whatsapp-clone', 1, {
    upgrade(db) {
      const messageStore = db.createObjectStore('messages', {
        keyPath: 'id',
      });
      messageStore.createIndex('by-conversation', ['senderId', 'receiverId']);
      
      db.createObjectStore('contacts', { keyPath: 'id' });
    },
  });
}

export async function getMessages(conversationId: string) {
  await initDB();
  return db.getAllFromIndex('messages', 'by-conversation', conversationId);
}

export async function saveMessage(message: WhatsAppDB['messages']['value']) {
  await initDB();
  await db.add('messages', message);
}

export async function getContacts() {
  await initDB();
  return db.getAll('contacts');
}

export async function saveContact(contact: WhatsAppDB['contacts']['value']) {
  await initDB();
  await db.put('contacts', contact);
}
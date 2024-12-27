import { supabase } from '../lib/supabase';
import { saveContact } from '../lib/db';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: number;
}

export async function fetchContacts() {
  try {
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    // Store contacts in IndexedDB for offline access
    await Promise.all(contacts.map(contact => saveContact(contact)));

    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
}
/*
  # Initial Schema for WhatsApp Clone

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `avatar` (text)
      - `created_at` (timestamp)
      - `last_message` (text, nullable)
      - `last_message_time` (timestamp, nullable)
    
    - `messages`
      - `id` (uuid, primary key)
      - `content` (text)
      - `sender_id` (text)
      - `receiver_id` (text) 
      - `timestamp` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_message text,
  last_message_time timestamptz
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  sender_id text NOT NULL,
  receiver_id text NOT NULL,
  timestamp bigint NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can insert messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert some sample contacts
INSERT INTO contacts (name, avatar) VALUES
  ('Alice Johnson', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
  ('Bob Smith', 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150'),
  ('Carol Williams', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150');
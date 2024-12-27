import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://idmfxcmrjfxugbishnfj.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbWZ4Y21yamZ4dWdiaXNobmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMTMyOTAsImV4cCI6MjA1MDg4OTI5MH0.4Tul8WffQmV314IJjpCopQJ_aU_-NHTfzzNzHdtGESY";

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
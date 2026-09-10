import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase configuration. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Keep the admin signed in across reloads and refresh tokens in the background.
    persistSession: true,
    autoRefreshToken: true,
  },
});

/** A row of the `contact_messages` table. */
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

/** The shape the public contact form submits. */
export type ContactMessageInput = Pick<
  ContactMessage,
  'name' | 'email' | 'subject' | 'message'
>;

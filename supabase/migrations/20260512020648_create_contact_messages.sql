/*
  # Create Contact Messages Table

  ## Summary
  Sets up a table to persist contact form submissions from the portfolio website.

  ## New Tables
  - `contact_messages`
    - `id` (uuid, primary key, auto-generated)
    - `name` (text, required) — sender's full name
    - `email` (text, required) — sender's email address
    - `subject` (text, required) — message subject
    - `message` (text, required) — message body
    - `created_at` (timestamptz) — submission timestamp

  ## Security
  - RLS enabled; anonymous users may only INSERT (submit a form)
  - No public read access — only the service role can view messages
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

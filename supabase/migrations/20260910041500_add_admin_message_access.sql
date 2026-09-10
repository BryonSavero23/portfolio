/*
  # Admin Access for Contact Messages

  ## Summary
  Adds read-tracking and admin-only access policies to `contact_messages` so the
  /admin portal can list, mark as read, and delete submissions.

  Before this migration the table had a single INSERT policy, which meant an
  authenticated admin could not SELECT, UPDATE, or DELETE any row.

  ## Changes
  - `contact_messages.is_read` (boolean, NOT NULL, default false) — read tracking
  - Index on `created_at DESC` to support the dashboard's newest-first ordering

  ## Security
  - Adds `public.is_portfolio_admin()`, which matches the JWT email claim against
    a single allow-listed admin address. Change the address here to rotate admins.
  - Adds SELECT / UPDATE / DELETE policies on `contact_messages` restricted to
    that admin. Merely being authenticated is NOT sufficient, so enabling public
    sign-ups cannot expose message contents.
  - The existing anon INSERT policy is left unchanged so the public form works.
*/

-- 1. Read-tracking column ----------------------------------------------------

ALTER TABLE contact_messages
  ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
  ON contact_messages (created_at DESC);

-- 2. Admin identity helper ---------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_portfolio_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = ''
AS $$
  SELECT coalesce(auth.jwt() ->> 'email', '') = 'bryonsavero.work@gmail.com'
$$;

-- 3. Admin-only read / write policies ---------------------------------------

DROP POLICY IF EXISTS "Admin can read contact messages" ON contact_messages;
CREATE POLICY "Admin can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Admin can update contact messages" ON contact_messages;
CREATE POLICY "Admin can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (public.is_portfolio_admin())
  WITH CHECK (public.is_portfolio_admin());

DROP POLICY IF EXISTS "Admin can delete contact messages" ON contact_messages;
CREATE POLICY "Admin can delete contact messages"
  ON contact_messages
  FOR DELETE
  TO authenticated
  USING (public.is_portfolio_admin());

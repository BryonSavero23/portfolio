/*
  # Enable Realtime on contact_messages

  ## Summary
  Adds `contact_messages` to the `supabase_realtime` publication so the /admin
  dashboard receives `postgres_changes` events and new submissions appear
  without pressing Refresh.

  Without this, a client can subscribe successfully and simply never receive
  anything — the channel reports SUBSCRIBED but no rows are ever published.

  ## Security
  - Realtime applies RLS to INSERT and UPDATE events, so only the admin allowed
    to SELECT by `is_portfolio_admin()` receives message contents. An anonymous
    subscriber gets nothing.
  - Caveat: Postgres publishes DELETE events without RLS filtering, and per-table
    operation filtering is not supported on a shared publication. A subscriber
    could therefore observe the primary key of a deleted row — an opaque UUID
    with no message content. This is inherent to Supabase Realtime.
  - Replica identity is left at the default (primary key). The dashboard only
    needs `old.id` on DELETE, so REPLICA IDENTITY FULL is not required and would
    add avoidable WAL volume.
*/

-- The publication ships with Supabase projects, but create it if absent so this
-- migration also applies to a bare Postgres instance.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

-- ALTER PUBLICATION ... ADD TABLE has no IF NOT EXISTS, so guard it to keep the
-- migration idempotent.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'contact_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_messages;
  END IF;
END $$;

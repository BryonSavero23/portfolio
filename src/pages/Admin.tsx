import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

/**
 * Gate for the /admin portal.
 *
 * The client-side check below only controls what is rendered. The real
 * protection is row-level security on `contact_messages`: message rows are
 * only readable by the allow-listed admin, so an unauthenticated visitor
 * reaching this route cannot retrieve any data.
 */
export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setChecking(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Admin — Bryon Savero';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-neutral-700 border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  return session ? <AdminDashboard session={session} /> : <AdminLogin />;
}

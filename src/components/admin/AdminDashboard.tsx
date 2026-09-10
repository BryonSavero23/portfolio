import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { AlertCircle, Inbox, LogOut, RefreshCw } from 'lucide-react';
import { supabase, type ContactMessage } from '../../lib/supabase';
import MessageCard from './MessageCard';

type Props = { session: Session };

export default function AdminDashboard({ session }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setMessages((data ?? []) as ContactMessage[]);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const unreadCount = useMemo(
    () => messages.filter((m) => !m.is_read).length,
    [messages]
  );

  const handleToggleRead = async (target: ContactMessage) => {
    const nextValue = !target.is_read;
    setBusyId(target.id);

    const { error: updateError } = await supabase
      .from('contact_messages')
      .update({ is_read: nextValue })
      .eq('id', target.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setError(null);
      setMessages((prev) =>
        prev.map((m) => (m.id === target.id ? { ...m, is_read: nextValue } : m))
      );
    }
    setBusyId(null);
  };

  const handleDelete = async (target: ContactMessage) => {
    const confirmed = window.confirm(
      `Delete the message from ${target.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    setBusyId(target.id);
    const { error: deleteError } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', target.id);

    if (deleteError) {
      setError(deleteError.message);
    } else {
      setError(null);
      setMessages((prev) => prev.filter((m) => m.id !== target.id));
    }
    setBusyId(null);
  };

  const handleSignOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-white">Messages</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Signed in as {session.user.email}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadMessages()}
              disabled={loading}
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-neutral-700 text-neutral-300 hover:border-sky-500 hover:text-sky-400 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : undefined} />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="text-neutral-400">
            <span className="text-white font-semibold">{messages.length}</span> total
          </span>
          <span className="w-px h-4 bg-neutral-800" />
          <span className="text-neutral-400">
            <span className="text-sky-400 font-semibold">{unreadCount}</span> unread
          </span>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 mb-6"
          >
            <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Could not complete that request.</p>
              <p className="text-red-400/80 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="w-6 h-6 border-2 border-neutral-700 border-t-sky-400 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Inbox size={40} className="text-neutral-700 mb-4" />
            <h2 className="text-white font-semibold mb-1">No messages yet</h2>
            <p className="text-sm text-neutral-500 max-w-xs">
              Submissions from the contact form will appear here, newest first.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                busy={busyId === message.id}
                onToggleRead={handleToggleRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

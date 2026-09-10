import { Check, Clock, Mail, Trash2, Undo2 } from 'lucide-react';
import type { ContactMessage } from '../../lib/supabase';

type Props = {
  message: ContactMessage;
  busy: boolean;
  onToggleRead: (message: ContactMessage) => void;
  onDelete: (message: ContactMessage) => void;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function MessageCard({ message, busy, onToggleRead, onDelete }: Props) {
  const { name, email, subject, message: body, is_read, created_at } = message;

  return (
    <article
      className={`rounded-2xl border p-5 transition-colors ${
        is_read
          ? 'bg-neutral-900/40 border-neutral-800'
          : 'bg-neutral-900 border-sky-500/25'
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-semibold truncate">{subject || '(no subject)'}</h3>
            {!is_read && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-sky-300 bg-sky-500/15 border border-sky-500/25 rounded-full px-2 py-0.5">
                New
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500 flex-wrap">
            <span className="text-neutral-300">{name}</span>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1 hover:text-sky-400 transition-colors"
            >
              <Mail size={11} />
              {email}
            </a>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} />
              {formatDate(created_at)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onToggleRead(message)}
            disabled={busy}
            title={is_read ? 'Mark as unread' : 'Mark as read'}
            className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:border-sky-500 hover:text-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {is_read ? <Undo2 size={13} /> : <Check size={13} />}
            {is_read ? 'Unread' : 'Mark read'}
          </button>
          <button
            type="button"
            onClick={() => onDelete(message)}
            disabled={busy}
            title="Delete message"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:border-red-500 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap break-words">
        {body}
      </p>
    </article>
  );
}

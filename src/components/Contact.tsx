import { useEffect, useRef, useState, FormEvent } from 'react';
import { Mail, Linkedin, Send, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import type { ContactMessageInput } from '../lib/supabase';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY_FORM: ContactMessageInput = { name: '', email: '', subject: '', message: '' };

// Client-side caps; keep in sync with the maxLength attributes below.
const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 } as const;

const contactDetails = [
  {
    icon: Mail,
    label: 'Email',
    value: 'bryonsavero.work@gmail.com',
    href: 'mailto:bryonsavero.work@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/bryon-savero-64871328a',
    href: 'https://www.linkedin.com/in/bryon-savero-64871328a/',
  },
  { icon: MapPin, label: 'Location', value: 'Penang, Malaysia — Open to remote', href: null },
];

const fieldClass =
  'w-full bg-neutral-800 border border-neutral-500 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/50 transition-colors';

export default function Contact() {
  const [form, setForm] = useState<ContactMessageInput>(EMPTY_FORM);
  // Honeypot: a field real visitors never see or fill. Bots that fill every
  // input get a fake success and nothing is written to the database.
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const successRef = useRef<HTMLHeadingElement>(null);

  // The form unmounts on success, which would drop keyboard focus to <body>.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (website.trim() !== '') {
      setStatus('success');
      setForm(EMPTY_FORM);
      setWebsite('');
      return;
    }

    const payload: ContactMessageInput = {
      name: form.name.trim().slice(0, LIMITS.name),
      email: form.email.trim().slice(0, LIMITS.email),
      subject: form.subject.trim().slice(0, LIMITS.subject),
      message: form.message.trim().slice(0, LIMITS.message),
    };

    try {
      // Loaded on demand so the Supabase client is not in the bundle every
      // visitor downloads. A missing-env error from that module lands in the
      // catch below instead of breaking the whole page.
      const { supabase } = await import('../lib/supabase');
      const { error } = await supabase.from('contact_messages').insert([payload]);
      if (error) throw new Error(error.message);
      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('Failed to submit contact message:', err instanceof Error ? err.message : err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-28 section-padding bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Get In Touch</p>
          <h2 id="contact-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Have a project in mind, or just want to say hi? I'm always open to interesting conversations and new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          {/* Left: info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Details</h3>
              <div className="space-y-4">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-sky-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-neutral-400 mb-0.5">{label}</div>
                      {href ? (
                        <a
                          href={href}
                          className="inline-block py-1 -my-1 text-sm text-neutral-200 underline decoration-neutral-600 underline-offset-4 hover:text-sky-300 hover:decoration-sky-400 transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <div className="text-sm text-neutral-300">{value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white">Available for work</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Currently open to full-time roles and select freelance projects. Response time is usually within 24 hours.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
            {status === 'success' ? (
              <div role="status" className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={48} className="text-emerald-400 mb-4" aria-hidden="true" />
                <h3 ref={successRef} tabIndex={-1} className="text-white font-semibold text-lg mb-2 focus:outline-none">
                  Message Sent!
                </h3>
                <p className="text-neutral-400 text-sm max-w-xs">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 min-h-11 px-3 text-sm text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5" htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={LIMITS.name}
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5" htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={LIMITS.email}
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5" htmlFor="subject">
                    Subject <span className="text-neutral-400">(optional)</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    maxLength={LIMITS.subject}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={LIMITS.message}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                {/* Honeypot — hidden from sighted users, assistive tech and the tab order. */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="fax">Fax</label>
                  <input
                    id="fax"
                    name="fax"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Always mounted so screen readers announce the error when it appears. */}
                <div role="alert">
                  {status === 'error' && (
                    <div className="flex items-start gap-2 text-red-300 text-sm bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-3">
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        Your message could not be sent. Please try again, or email me directly at{' '}
                        <a href="mailto:bryonsavero.work@gmail.com" className="underline underline-offset-2">
                          bryonsavero.work@gmail.com
                        </a>
                        .
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-neutral-950 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/25"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

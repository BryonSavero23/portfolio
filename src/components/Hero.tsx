import { ArrowRight, ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/BryonSavero23' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryon-savero-64871328a/' },
  { icon: Mail, label: 'Email', href: 'mailto:bryonsavero.work@gmail.com' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      // Top padding clears the fixed navbar when the content is taller than
      // the viewport (phones); bottom padding leaves room for the scroll hint.
      className="relative min-h-screen flex flex-col justify-center section-padding pt-20 sm:pt-24 pb-16 md:pb-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-600/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.4fr_1fr] gap-12 xl:gap-16 items-center">
        <div>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            Open to AI engineering roles · Penang or remote
          </div>

          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">
            Bryon Savero · AI Solutions Engineer
          </p>

          <h1
            id="hero-heading"
            className="font-display text-4xl sm:text-5xl xl:text-[3.25rem] 2xl:text-6xl font-bold leading-[1.1] mb-6 tracking-tight"
          >
            I build <span className="text-gradient">LLM and computer-vision</span> systems that
            ship to production.
          </h1>

          <p className="max-w-2xl text-neutral-400 text-base sm:text-lg leading-relaxed mb-8">
            At WCOE I build LLM-powered knowledge systems for education and training. Before
            that, at Sunway, I deployed a face-recognition system with mask detection at
            Menara Sunway.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-neutral-950 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
            >
              View My Work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/cv.pdf"
              download="Bryon_Savero_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium border border-neutral-700 hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Find me on</span>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-sky-500/50 text-neutral-300 hover:text-sky-400 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Portrait — large screens only; below `lg` the About section shows it
            instead, so the photo never appears twice. */}
        <div className="hidden lg:block relative justify-self-end w-full max-w-sm xl:max-w-md">
          <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800">
            <img
              src="/profile.webp"
              alt="Portrait of Bryon Savero"
              width={896}
              height={1116}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl bg-sky-500/10 border border-sky-500/20" aria-hidden="true" />
          <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl border border-neutral-800" aria-hidden="true" />
        </div>
      </div>

      {/* Scroll hint — desktop only; on phones it collided with the social row. */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 px-3 py-1 text-neutral-400 hover:text-neutral-200 transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

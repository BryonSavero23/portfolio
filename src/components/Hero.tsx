import { ArrowDown, Github, Linkedin, Twitter, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

const roles = ['AI Solutions Engineer', 'ML Engineer', 'Full-Stack Developer', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 35);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/6 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-600/3 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for new opportunities
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 tracking-tight">
          Hi, I'm{' '}
          <span className="text-gradient">Bryon Savero</span>
        </h1>

        <div className="h-10 mb-6">
          <p className="text-xl md:text-2xl text-neutral-300 font-light">
            <span>{displayed}</span>
            <span className="inline-block w-0.5 h-6 bg-sky-400 ml-0.5 animate-pulse align-middle" />
          </p>
        </div>

        <p className="max-w-2xl text-neutral-400 text-lg leading-relaxed mb-10">
          I build AI-powered solutions — from intelligent LLM systems and computer vision
          pipelines to full-stack web applications. Passionate about bridging real-world
          problems with intelligent automation and scalable AI.
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/25 hover:-translate-y-0.5"
          >
            View My Work
            <ArrowDown size={16} className="rotate-[-90deg]" />
          </a>
          <a
            href="/cv.pdf"
            download="Bryon_Savero_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium border border-neutral-700 hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xs text-neutral-600 uppercase tracking-widest">Find me on</span>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, label: 'GitHub', href: 'https://github.com/BryonSavero23' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryon-savero-64871328a/' },
              { icon: Twitter, label: 'Twitter', href: '#' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-sky-500/50 text-neutral-400 hover:text-sky-400 flex items-center justify-center transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition-colors group"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}

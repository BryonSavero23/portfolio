import { Github, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const links = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { icon: Github, label: 'GitHub', href: 'https://github.com/BryonSavero23' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/bryon-savero-64871328a/' },
    { icon: Mail, label: 'Email', href: 'mailto:bryonsavero.work@gmail.com' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 section-padding py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
                <Code2 size={14} className="text-neutral-950" aria-hidden="true" />
              </span>
              <span className="font-semibold text-white">Bryon Savero Michael Leo</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              AI Engineer & Full-stack developer based in Malaysia. Building products that people love to use.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div>
              <h3 className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Navigation</h3>
              <ul>
                {links.nav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex items-center min-h-11 md:min-h-9 text-sm text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs text-neutral-400 uppercase tracking-widest mb-2">Connect</h3>
              <div className="flex flex-col">
                {links.social.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 min-h-11 md:min-h-9 text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    <Icon size={14} aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-400">
          <span>© {new Date().getFullYear()} Bryon Savero. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-500 fill-red-500" aria-hidden="true" />
            <span className="sr-only">love</span> using React & Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}

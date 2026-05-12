import { Github, Linkedin, Twitter, Code2, Heart } from 'lucide-react';

const links = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
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
                <Code2 size={14} className="text-white" />
              </span>
              <span className="font-semibold text-white">Bryon Savero Michael Leo</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              AI Engineer & Full-stack developer based in Malaysia. Building products that people love to use.
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                {links.nav.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white link-underline transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Connect</h4>
              <div className="flex flex-col gap-2.5">
                {links.social.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-600">
          <span>© {new Date().getFullYear()} Bryon Savero. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-500 fill-red-500" /> using React & Tailwind
          </span>
        </div>
      </div>
    </footer>
  );
}

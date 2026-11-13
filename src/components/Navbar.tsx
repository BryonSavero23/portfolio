import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/60 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 group py-1.5"
          onClick={handleNavClick}
        >
          <span className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center group-hover:bg-sky-400 transition-colors">
            <Code2 size={16} className="text-neutral-950" aria-hidden="true" />
          </span>
          <span className="font-semibold text-white tracking-tight">Bryon Savero</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-block py-2 text-sm text-neutral-400 hover:text-white link-underline transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="inline-block text-sm font-semibold px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 transition-colors duration-200"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden -mr-2.5 w-11 h-11 flex items-center justify-center rounded-lg text-neutral-300 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu. `invisible` when closed takes the links out of the tab
          order and the accessibility tree; opacity/max-height alone would
          leave them focusable while hidden. */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <ul className="px-6 pt-1 pb-5 flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center min-h-11 text-neutral-300 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="inline-flex items-center min-h-11 text-sm font-semibold px-5 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 transition-colors"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

import { MapPin, Trophy, Brain, Globe } from 'lucide-react';

const stats = [
  { value: '2+', label: 'Years in AI/ML' },
  { value: '4+', label: 'Projects Shipped' },
  { value: '3.50', label: 'CGPA (Honours)' },
  { value: "Dean's List", label: 'Award 2024/25' },
];

const facts = [
  { icon: MapPin, text: 'Based in Penang, Malaysia' },
  { icon: Trophy, text: 'Futsal Champion (SUKAPPS 2025)' },
  { icon: Brain, text: 'Passionate about AI & intelligent systems' },
  { icon: Globe, text: 'Speaks 4 languages' },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            {/* Portrait — below `lg` only; on large screens the hero shows it. */}
            <div className="relative lg:hidden mb-16 max-w-md">
              <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="/profile.webp"
                  alt="Portrait of Bryon Savero"
                  width={896}
                  height={1116}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-4 -right-2 z-20 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-2xl max-w-[180px]">
                <div className="text-2xl font-bold text-white mb-0.5">2+ Years</div>
                <div className="text-xs text-neutral-400">Building AI solutions</div>
              </div>

              {/* Decorative element */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl bg-sky-500/10 border border-sky-500/20" aria-hidden="true" />
            </div>

            <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">About Me</p>
            <h2 id="about-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Crafting digital products with purpose
            </h2>
            <div className="space-y-4 text-neutral-400 leading-relaxed max-w-2xl">
              <p>
                I'm an AI Solutions Engineer with a strong foundation in machine learning,
                full-stack development, and intelligent system design. Currently at WCOE (Walta
                Centre Of Excellence), I deliver production-ready AI systems for education and
                training use cases.
              </p>
              <p>
                I specialize in Large Language Models (LLMs), prompt engineering, and AI-powered
                knowledge systems — with hands-on experience in computer vision pipelines, RAG
                workflows, and full-stack web development. I thrive at the intersection of AI and
                real-world problem solving.
              </p>
              <p>
                When I'm not building AI solutions, I'm leading technical teams at hackathons,
                competing in futsal tournaments, or exploring the latest research in generative AI
                and intelligent automation.
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
            {/* Stats */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 pb-8 border-b border-neutral-800">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="text-xs text-neutral-400 leading-tight mt-1">{label}</dt>
                  <dd className="text-2xl font-bold text-white">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Fun facts */}
            <ul className="space-y-3.5 pt-8">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-neutral-300">
                  <Icon size={15} className="text-sky-400 flex-shrink-0" aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

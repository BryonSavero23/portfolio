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
    <section id="about" className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="relative z-10 aspect-[4/5] rounded-2xl overflow-hidden max-w-md">
              <img
                src="/profile.png"
                alt="Bryon Savero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -right-4 lg:right-0 z-20 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-2xl max-w-[180px]">
              <div className="text-2xl font-bold text-white mb-0.5">2+ Years</div>
              <div className="text-xs text-neutral-400">Building AI solutions</div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-xl bg-sky-500/10 border border-sky-500/20" />
            <div className="absolute top-1/2 -left-8 w-4 h-4 rounded-full bg-sky-400" />
          </div>

          {/* Text side */}
          <div>
            <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">About Me</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Crafting digital products with purpose
            </h2>
            <div className="space-y-4 text-neutral-400 leading-relaxed mb-8">
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

            {/* Fun facts */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {facts.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-neutral-400">
                  <Icon size={14} className="text-sky-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-neutral-800">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-xs text-neutral-500 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

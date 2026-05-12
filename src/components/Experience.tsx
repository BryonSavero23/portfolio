import { Briefcase, GraduationCap } from 'lucide-react';

type Entry = {
  title: string;
  org: string;
  period: string;
  description: string;
  tags?: string[];
  type: 'work' | 'edu';
};

const timeline: Entry[] = [
  {
    type: 'work',
    title: 'Senior Frontend Engineer',
    org: 'Stripe',
    period: '2023 — Present',
    description:
      "Lead frontend development for Stripe's developer dashboard. Reduced initial load time by 40% through code-splitting and lazy loading strategies. Mentored two junior engineers.",
    tags: ['React', 'TypeScript', 'GraphQL', 'Figma'],
  },
  {
    type: 'work',
    title: 'Full-Stack Engineer',
    org: 'Linear',
    period: '2021 — 2023',
    description:
      'Built core product features end-to-end in a fast-paced startup. Owned the notifications system from design to delivery. Shipped features used by 50k+ developers daily.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Electron'],
  },
  {
    type: 'edu',
    title: 'B.S. Computer Science',
    org: 'UC Berkeley',
    period: '2017 — 2021',
    description:
      'Graduated with honors. Focused on systems programming and distributed computing. Teaching assistant for Data Structures & Algorithms for two semesters.',
  },
  {
    type: 'work',
    title: 'Software Engineering Intern',
    org: 'Figma',
    period: 'Summer 2020',
    description:
      'Worked on the plugins API team. Contributed to performance improvements in the plugin sandbox and shipped a new API endpoint used by the most popular Figma plugins.',
    tags: ['TypeScript', 'C++', 'WebAssembly'],
  },
];

function TimelineItem({ entry, index }: { entry: Entry; index: number }) {
  const isLeft = index % 2 === 0;
  const Icon = entry.type === 'work' ? Briefcase : GraduationCap;

  return (
    <div className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Card */}
      <div className="flex-1 md:max-w-[calc(50%-2rem)]">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-white">{entry.title}</h3>
              <p className="text-sky-400 text-sm mt-0.5">{entry.org}</p>
            </div>
            <span className="text-xs text-neutral-500 whitespace-nowrap ml-4 mt-0.5">{entry.period}</span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">{entry.description}</p>
          {entry.tags && (
            <div className="flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center icon - desktop */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-neutral-900 border-2 border-sky-500/50 items-center justify-center z-10 flex-shrink-0">
        <Icon size={16} className="text-sky-400" />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 section-padding bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Journey</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            The roles and experiences that shaped how I think about software and product.
          </p>
        </div>

        {/* Mobile: simple list */}
        <div className="md:hidden space-y-6">
          {timeline.map((entry) => {
            const Icon = entry.type === 'work' ? Briefcase : GraduationCap;
            return (
              <div key={entry.title} className="flex gap-4">
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-neutral-900 border border-sky-500/50 flex items-center justify-center">
                  <Icon size={14} className="text-sky-400" />
                </div>
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{entry.title}</h3>
                      <p className="text-sky-400 text-xs mt-0.5">{entry.org}</p>
                    </div>
                    <span className="text-xs text-neutral-500 ml-3">{entry.period}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">{entry.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: timeline */}
        <div className="hidden md:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-neutral-800" />

          <div className="space-y-10">
            {timeline.map((entry, i) => (
              <TimelineItem key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

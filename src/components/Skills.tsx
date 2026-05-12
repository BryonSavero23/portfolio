type Skill = { name: string; level: number };

type SkillCategory = {
  category: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'GraphQL', level: 78 },
      { name: 'REST APIs', level: 92 },
    ],
  },
  {
    category: 'Tools & Infra',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Docker', level: 80 },
      { name: 'CI/CD Pipelines', level: 78 },
      { name: 'AWS / Supabase', level: 82 },
    ],
  },
];

const techBadges = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind',
  'Docker', 'GraphQL', 'Redis', 'AWS', 'Figma', 'Supabase',
  'Prisma', 'tRPC', 'Vitest', 'Storybook',
];

function SkillBar({ name, level }: Skill) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-neutral-300">{name}</span>
        <span className="text-xs text-neutral-500 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-1000"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 section-padding bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Expertise</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A collection of tools and technologies I've used to bring ideas to life.
          </p>
        </div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {skillCategories.map(({ category, skills }) => (
            <div
              key={category}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-sky-400 rounded-full" />
                {category}
              </h3>
              <div className="space-y-5">
                {skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className="text-center">
          <p className="text-xs text-neutral-600 uppercase tracking-widest mb-6">Also familiar with</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-400 border border-neutral-700/50 hover:border-sky-500/40 hover:text-sky-300 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

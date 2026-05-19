type SkillCategory = {
  category: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    category: 'AI/ML & Generative AI',
    skills: [
      'TensorFlow', 'Keras', 'PyTorch', 'OpenAI API',
      'Prompt Engineering', 'RAG', 'Computer Vision', 'GradCAM',
      'Decision Trees', 'Random Forests',
    ],
  },
  {
    category: 'Frontend',
    skills: ['ReactJS', 'Flutter', 'HTML5 / CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase Firestore', 'Supabase'],
  },
  {
    category: 'Cloud & Tools',
    skills: ['Google Cloud Platform', 'Firebase', 'Vercel', 'Streamlit', 'Pandas', 'Plotly', 'Git / GitHub'],
  },
  {
    category: 'Other',
    skills: ['CI/CD Pipelines', 'Agile / Scrum', 'System Design', 'Technical Documentation', 'Stakeholder Collaboration'],
  },
];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map(({ category, skills }) => (
            <div
              key={category}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-sky-400 rounded-full flex-shrink-0" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700/50 hover:border-sky-500/40 hover:text-sky-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

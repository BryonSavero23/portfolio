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
    title: 'AI Solutions Engineer',
    org: 'WCOE (Walta Centre Of Excellence), Batu Kawan',
    period: 'Jan 2026 — Present',
    description:
      'Designing and developing AI-powered solutions leveraging LLMs for education and training use cases. Building AI knowledge-based systems, applying prompt engineering for structured responses, and integrating document-based knowledge sources to support contextual Q&A workflows. Exploring RAG concepts to enhance response relevance and collaborating with stakeholders to translate requirements into AI-driven solutions.',
    tags: ['LLMs', 'Prompt Engineering', 'RAG', 'OpenAI API', 'Knowledge Systems'],
  },
  {
    type: 'work',
    title: 'AI / ML Engineer Intern',
    org: 'Sunway Digital Technology Solutions (DTS)',
    period: 'Mar 2024 — Sep 2024',
    description:
      'Developed and deployed a production-ready face recognition system with integrated mask detection at Sunway FSSC Office, Menara Sunway. Built a GradCAM-based periocular analysis pipeline to improve masked face recognition accuracy. Developed a vehicle analytics dashboard with automated alerting using Streamlit, Pandas, and Plotly. Collaborated on FastAPI services and Google Cloud Platform deployment.',
    tags: ['TensorFlow', 'Keras', 'PyTorch', 'FastAPI', 'GCP', 'Streamlit'],
  },
  {
    type: 'edu',
    title: 'Bachelor in Computer Science (Intelligent Computing) with Honours',
    org: 'University Sains Malaysia (USM)',
    period: 'Oct 2021 — Jul 2025',
    description:
      'Graduated with CGPA 3.50. Dean\'s List Award (Academic Session 2024/2025). Active in Computer Science Society (Committee Member), USM Google Developer Student Club (Core Team Member), and Computer Science Futsal Team. Top 10 Finalist at Varsity Hackathon 2024; Head of Technical Department at Varsity Hackathon 2023.',
    tags: ['CGPA 3.50', "Dean's List", 'GDSC Core Team', 'Hackathon Finalist'],
  },
];

function TimelineItem({ entry }: { entry: Entry }) {
  const Icon = entry.type === 'work' ? Briefcase : GraduationCap;

  return (
    <li className="relative flex gap-4 md:gap-6">
      <div className="relative z-10 flex-shrink-0 mt-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-neutral-900 border-2 border-sky-500/50 flex items-center justify-center">
        <Icon size={16} className="text-sky-400" aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 md:p-6 hover:border-neutral-700 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
          <div>
            <h3 className="font-semibold text-white">{entry.title}</h3>
            <p className="text-sky-400 text-sm mt-0.5">{entry.org}</p>
          </div>
          <span className="text-xs text-neutral-400 whitespace-nowrap sm:mt-1">{entry.period}</span>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">{entry.description}</p>
        {entry.tags && (
          <ul className="flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <li key={tag} className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-28 section-padding bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Journey</p>
          <h2 id="experience-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            The roles and experiences that shaped how I think about AI, software, and product.
          </p>
        </div>

        {/* Single left-aligned timeline at every width: one DOM tree, full-width
            cards, and a readable line length on desktop. */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[17px] md:left-[19px] top-5 bottom-5 w-px bg-neutral-800" aria-hidden="true" />
          <ol className="space-y-6 md:space-y-8">
            {timeline.map((entry) => (
              <TimelineItem key={entry.title} entry={entry} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { UserCheck } from 'lucide-react';

type Reference = {
  name: string;
  title: string;
  org: string;
  relationship: string;
  avatar: string;
};

const references: Reference[] = [
  {
    name: "Dato' Bernard Francis",
    title: 'CEO',
    org: 'Transnusa Aviation Group',
    relationship: 'Industry Reference',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Dr Fadratul Hafinaz Hassan',
    title: 'Senior Lecturer',
    org: 'University Sains Malaysia',
    relationship: 'Academic Supervisor',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Noelle Tan Huey Wen',
    title: 'AI/ML Manager',
    org: 'Sunway Digital',
    relationship: 'Internship Manager',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">References</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Professional References
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Professionals who can speak to my work, character, and contributions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {references.map((ref) => (
            <div
              key={ref.name}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <img
                src={ref.avatar}
                alt={ref.name}
                className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-sky-500/30"
              />
              <div className="text-base font-semibold text-white mb-0.5">{ref.name}</div>
              <div className="text-sm text-sky-400 mb-1">{ref.title}</div>
              <div className="text-xs text-neutral-500 mb-4">{ref.org}</div>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <UserCheck size={12} />
                {ref.relationship}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-600 mt-8">
          Full contact details available upon request.
        </p>
      </div>
    </section>
  );
}

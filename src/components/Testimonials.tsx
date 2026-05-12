import { Quote } from 'lucide-react';

type Testimonial = {
  name: string;
  title: string;
  company: string;
  avatar: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    title: 'Head of Product',
    company: 'Linear',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: "Alex is one of the most thoughtful engineers I've worked with. They have a rare ability to deeply understand user problems and translate that into exceptional product experiences. The features they shipped are still among our highest-rated.",
  },
  {
    name: 'Marcus Williams',
    title: 'Engineering Manager',
    company: 'Stripe',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: "Alex consistently ships high-quality work with minimal oversight. Their code is clean, well-tested, and maintainable. Beyond the technical skills, they're a great collaborator and communicator — exactly what you want on a high-performance team.",
  },
  {
    name: 'Priya Nair',
    title: 'CTO & Co-founder',
    company: 'Verdant',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100',
    text: "We brought Alex on as a freelancer and they turned our MVP into a production-ready product in record time. The attention to detail in both the code and the design was remarkable. Highly recommended for any serious product work.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Kind Words</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Feedback from colleagues and clients I've had the pleasure of working with.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <Quote size={24} className="text-sky-500/40 mb-4 flex-shrink-0" />
              <p className="text-neutral-300 text-sm leading-relaxed flex-1 mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.title}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

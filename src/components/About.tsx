import { MapPin, Coffee, Zap, Heart } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '40+', label: 'Projects Shipped' },
  { value: '15+', label: 'Happy Clients' },
  { value: '8', label: 'Open Source Repos' },
];

const facts = [
  { icon: MapPin, text: 'Based in San Francisco, CA' },
  { icon: Coffee, text: '3 cups of coffee per day, minimum' },
  { icon: Zap, text: 'Obsessed with web performance' },
  { icon: Heart, text: 'Dog dad & weekend hiker' },
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
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Bryon Savero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -right-4 lg:right-0 z-20 bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-2xl max-w-[180px]">
              <div className="text-2xl font-bold text-white mb-0.5">5+ Years</div>
              <div className="text-xs text-neutral-400">Building for the web</div>
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
                I'm a full-stack developer with a deep passion for building products that are as
                beautiful as they are functional. My journey started with a fascination for how
                software shapes human behavior, and it's driven every project since.
              </p>
              <p>
                I specialize in React, TypeScript, and Node.js, with a strong eye for design and
                user experience. I thrive in collaborative environments and love transforming
                ambiguous problems into clear, maintainable solutions.
              </p>
              <p>
                When I'm not writing code, you'll find me contributing to open source, reading
                about distributed systems, or exploring trails with my dog.
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

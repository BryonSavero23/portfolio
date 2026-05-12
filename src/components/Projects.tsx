import { ExternalLink, Github, Star } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  stars?: number;
};

const projects: Project[] = [
  {
    title: 'Nexus — Team Collaboration Platform',
    description:
      'A real-time collaboration suite with channels, threads, file sharing, and video calls. Built for distributed teams who need speed and reliability.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'TypeScript', 'WebSockets', 'PostgreSQL', 'Redis'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    stars: 412,
  },
  {
    title: 'Verdant — Personal Finance Tracker',
    description:
      'A clean, privacy-first finance app for tracking spending, budgets, and financial goals. No ads, no data selling, fully open source.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'Prisma', 'Tailwind', 'Supabase'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    stars: 287,
  },
  {
    title: 'Codeflow — Developer CLI Tool',
    description:
      'A powerful CLI that automates repetitive developer workflows — PR creation, changelog generation, and deployment checks from the terminal.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Node.js', 'TypeScript', 'GitHub API', 'Inquirer'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
    stars: 156,
  },
  {
    title: 'Luminara — E-Commerce Storefront',
    description:
      'A premium e-commerce experience with blazing-fast SSR, headless CMS, and a seamless checkout flow. 98+ Lighthouse score.',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Next.js', 'Shopify API', 'Stripe', 'Sanity'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
  },
  {
    title: 'Pulse — Analytics Dashboard',
    description:
      'Real-time analytics dashboard with customizable widgets, data visualization, and export capabilities for SaaS businesses.',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'D3.js', 'FastAPI', 'TimescaleDB'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
  },
  {
    title: 'Nomad — Travel Planning App',
    description:
      'Collaborative trip planning with itinerary builder, map integration, budget tracking, and packing lists. Used by 2k+ travelers.',
    image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React Native', 'Expo', 'MapBox', 'Node.js'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-sky-500/90 text-white">
            Featured
          </span>
        )}
        {project.stars && (
          <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-neutral-900/80 text-yellow-400 border border-neutral-700/50">
            <Star size={11} fill="currentColor" />
            {project.stars}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-neutral-800">
          <a
            href={project.liveUrl}
            className="flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
          <a
            href={project.repoUrl}
            className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <Github size={13} />
            Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Selected Work
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A curated collection of projects that reflect my approach to solving real problems with clean, thoughtful code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium border border-neutral-700 hover:border-neutral-600 transition-all duration-200"
          >
            <Github size={16} />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

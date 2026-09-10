import { ExternalLink, Github } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    title: 'AI Knowledge Bot System',
    description:
      'Designed and configured an AI-powered knowledge assistant for educational use cases. Implemented structured system prompts for consistent, accurate responses and integrated document-based knowledge sources to enable contextual Q&A. Tuned LLM responses via prompt engineering and parameter adjustments.',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['OpenAI API', 'Prompt Engineering', 'LLM', 'RAG', 'Learningflow.AI'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    title: 'Personalized Rehabilitation Plans',
    description:
      'AI-driven mobile app (Final Year Project) that dynamically generates personalized rehabilitation plans based on patient data. Features real-time progress tracking, feedback analysis, and therapist collaboration. Integrated ML algorithms (Decision Trees, Random Forest) to adapt recovery routines based on pain levels and medical history.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Flutter', 'Firebase', 'Python', 'Decision Trees', 'Random Forest', 'ML'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    title: 'Kalakshetra 6.0 Event Management System',
    description:
      'Full-stack web application to manage participant registration, ticketing, and merchandise for a large-scale cultural event. Integrated Stripe payment gateway for secure transactions, implemented authentication and file uploads with a responsive UI.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Bootstrap', 'Stripe API', 'Vercel'],
    liveUrl: '#',
    repoUrl: '#',
    featured: false,
  },
  {
    title: 'IoT Weather Monitoring Station',
    description:
      'IoT-based system to collect and transmit real-time weather data using MQTT protocol. Deployed secure cloud infrastructure on GCP with TLS, IAM roles, and VPC firewall. Stored data in MongoDB for real-time access and BigQuery for long-term analysis, with interactive dashboards built in Looker Studio.',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['GCP', 'MQTT', 'MongoDB', 'BigQuery', 'Looker Studio', 'IoT'],
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
            A curated collection of projects that reflect my approach to solving real problems with AI, machine learning, and full-stack engineering.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/BryonSavero23"
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

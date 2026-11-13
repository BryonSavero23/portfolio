import { useEffect, useState } from 'react';
import { Code2, ExternalLink, Github } from 'lucide-react';

type Repository = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  url: string;
  homepage: string | null;
  updatedAt: string;
};

type RepositoryLoadError = 'rate-limit' | 'api';

const GITHUB_USERNAME = 'BryonSavero23';
const GITHUB_REPOSITORIES_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getRepositoryUrl(value: unknown): string | null {
  if (typeof value !== 'string') return null;

  try {
    const url = new URL(value);
    const path = url.pathname.split('/').filter(Boolean);
    return url.origin === 'https://github.com' &&
      path.length === 2 &&
      path[0].toLowerCase() === GITHUB_USERNAME.toLowerCase()
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function getHomepageUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;

  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') &&
      url.hostname.length > 0 &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function parseRepository(value: unknown): Repository | null {
  if (!isRecord(value)) return null;

  const url = getRepositoryUrl(value.html_url);
  if (
    typeof value.id !== 'number' ||
    typeof value.name !== 'string' ||
    typeof value.updated_at !== 'string' ||
    !Number.isFinite(Date.parse(value.updated_at)) ||
    typeof value.fork !== 'boolean' ||
    typeof value.archived !== 'boolean' ||
    value.fork ||
    value.archived ||
    !url
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    description: typeof value.description === 'string' ? value.description : null,
    language: typeof value.language === 'string' ? value.language : null,
    topics: Array.isArray(value.topics)
      ? value.topics.filter((topic): topic is string => typeof topic === 'string')
      : [],
    url,
    homepage: getHomepageUrl(value.homepage),
    updatedAt: value.updated_at,
  };
}

async function loadRepositories(): Promise<Repository[]> {
  const repositories: Repository[] = [];

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `${GITHUB_REPOSITORIES_API}?per_page=100&page=${page}&sort=updated&type=owner`,
      { headers: { Accept: 'application/vnd.github+json' } },
    );

    if (!response.ok) {
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const retryAfter = response.headers.get('retry-after');
      if (
        response.status === 429 ||
        (response.status === 403 && (rateLimitRemaining === '0' || retryAfter !== null))
      ) {
        throw new Error('rate-limit');
      }
      throw new Error('api');
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error('api');

    const pageRepositories = data
      .map(parseRepository)
      .filter((repository): repository is Repository => repository !== null);
    repositories.push(...pageRepositories);

    if (data.length < 100) break;
  }

  return repositories.sort(
    (first, second) => Date.parse(second.updatedAt) - Date.parse(first.updatedAt),
  );
}

function ProjectCard({ repository }: { repository: Repository }) {
  return (
    <article className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 flex flex-col">
      <div className="flex items-center justify-between p-5 pb-0">
        <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
          <Code2 size={20} aria-hidden="true" />
        </div>
        <a
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${repository.name} source on GitHub`}
          className="-m-3 w-11 h-11 flex items-center justify-center rounded-lg text-neutral-400 hover:text-white transition-colors"
        >
          <Github size={18} aria-hidden="true" />
        </a>
      </div>

      <div className="p-5 pb-2 flex flex-col flex-1">
        <h3 className="font-semibold text-white mb-2 leading-snug">
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-300 transition-colors"
          >
            {repository.name}
          </a>
        </h3>
        {repository.description && (
          <p className="text-sm text-neutral-400 leading-relaxed mb-4 flex-1">
            {repository.description}
          </p>
        )}

        {(repository.language || repository.topics.length > 0) && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repository.language && (
              <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                {repository.language}
              </span>
            )}
            {repository.topics.map((topic) => (
              <span
                key={topic}
                className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700/50"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-5 pt-1 border-t border-neutral-800">
          {repository.homepage && (
            <a
              href={repository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 min-h-11 text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors"
            >
              <ExternalLink size={13} aria-hidden="true" />
              Live Demo
            </a>
          )}
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${repository.name} source on GitHub`}
            className="flex items-center gap-1.5 min-h-11 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <Github size={13} aria-hidden="true" />
            Source
          </a>
        </div>
      </div>
    </article>
  );
}

function RepositoryStatus({
  loading,
  error,
  onRetry,
}: {
  loading: boolean;
  error: RepositoryLoadError | null;
  onRetry: () => void;
}) {
  if (loading) {
    return (
      <p className="text-center text-neutral-400 py-10" role="status" aria-live="polite">
        Loading public GitHub repositories…
      </p>
    );
  }

  if (error) {
    const message =
      error === 'rate-limit'
        ? 'GitHub’s public API rate limit has been reached. Please try again later.'
        : 'Repositories could not be loaded from GitHub right now.';

    return (
      <div className="text-center text-neutral-400 py-10" role="alert">
        <p>{message} You can still visit the GitHub profile below.</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 min-h-11 px-3 text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <p className="text-center text-neutral-400 py-10" role="status">
      No public, non-fork, non-archived repositories were found.
    </p>
  );
}

export default function Projects() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<RepositoryLoadError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchRepositories() {
      setLoading(true);
      setError(null);
      setRepositories([]);
      try {
        const allRepositories = await loadRepositories();
        if (active) {
          setRepositories(allRepositories);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error && loadError.message === 'rate-limit' ? 'rate-limit' : 'api');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchRepositories();
    return () => {
      active = false;
    };
  }, [retryCount]);

  const retry = () => setRetryCount((count) => count + 1);
  const hasRepositories = repositories.length > 0;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-28 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sky-400 text-sm font-medium uppercase tracking-widest mb-4">Portfolio</p>
          <h2 id="projects-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Selected Work
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Public repositories from my GitHub profile, sorted by recent activity.
          </p>
        </div>

        {hasRepositories && !loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {repositories.map((repository) => (
              <ProjectCard key={repository.id} repository={repository} />
            ))}
          </div>
        )}

        {(!hasRepositories || loading) && (
          <RepositoryStatus loading={loading} error={error} onRetry={retry} />
        )}

        <div className="text-center mt-12">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium border border-neutral-700 hover:border-neutral-600 transition-all duration-200"
          >
            <Github size={16} aria-hidden="true" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

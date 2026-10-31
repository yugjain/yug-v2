import { useEffect, useMemo, useState } from 'react';
import { pending } from './claims';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import { ArrowRight } from './components/Icons';
import { BASE } from './content';
import {
  allProjects,
  featuredProjects,
  formatShipped,
  statusLabels,
  statusOrder,
} from './lab/data';
import ProjectCard from './lab/ProjectCard';
import type { LabProject, LabStatus } from './lab/types';

const PAGE_SIZE = 24;
const ALL = 'all';

function matches(project: LabProject, needle: string): boolean {
  if (!needle) return true;
  const haystack = [
    project.name,
    project.oneLiner,
    project.description,
    project.language,
    project.status,
    ...project.topics,
    formatShipped(project.shippedAt),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(needle);
}

export default function LabApp() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<LabStatus | typeof ALL>(ALL);
  const [topic, setTopic] = useState<string>(ALL);
  const [language, setLanguage] = useState<string>(ALL);
  const [showArchived, setShowArchived] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const topics = useMemo(() => {
    const set = new Set<string>();
    for (const project of allProjects) {
      for (const item of project.topics) set.add(item);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    for (const project of allProjects) {
      if (project.language) set.add(project.language);
    }
    return [...set].sort((a, b) => a.localeCompare(b));
  }, []);

  const statusOptions = useMemo(
    () =>
      statusOrder.filter(
        (item) =>
          item !== 'archived' ||
          (showArchived && allProjects.some((project) => project.archived)),
      ),
    [showArchived],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return allProjects.filter((project) => {
      if (!showArchived && project.archived) return false;
      if (status === 'archived') {
        if (!project.archived) return false;
      } else if (status !== ALL && project.status !== status) {
        return false;
      }
      if (topic !== ALL && !project.topics.includes(topic)) return false;
      if (language !== ALL && project.language !== language) return false;
      return matches(project, needle);
    });
  }, [query, status, topic, language, showArchived]);

  // A new filter starts a fresh page. Without this, a narrowed result set
  // could keep an old, larger limit and render everything at once.
  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [query, status, topic, language, showArchived]);

  // Turning the archived toggle off should not leave a filter selected that
  // can no longer match anything.
  useEffect(() => {
    if (!showArchived && status === 'archived') setStatus(ALL);
  }, [showArchived, status]);

  const filtersActive =
    query.trim() !== '' || status !== ALL || topic !== ALL || language !== ALL;
  const shown = filtered.slice(0, limit);
  const hasMore = filtered.length > shown.length;
  const isFiltered = filtered.length !== allProjects.length;

  const clearFilters = () => {
    setQuery('');
    setStatus(ALL);
    setTopic(ALL);
    setLanguage(ALL);
    setShowArchived(false);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[12px] focus:text-paper"
      >
        Skip to content
      </a>

      <div id="top" className="sheet pb-16 sm:pb-0">
        <TopBar page="lab" />
        <main id="main">
          <header className="px-4 pb-6 pt-8 sm:px-7">
            <p className="eyebrow">Lab</p>
            <h1 className="mt-2 text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              Built on the side
            </h1>
            {pending.labIntro ? (
              <p className="mt-2 max-w-[58ch] text-[14px] leading-[1.7] text-muted">
                {pending.labIntro}
              </p>
            ) : null}
            <a href={BASE} className="link mt-3 inline-flex min-h-11 items-center gap-1.5 text-[13px]">
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Main site
            </a>
          </header>

          {allProjects.length === 0 ? (
            <section aria-labelledby="lab-empty" className="px-4 pb-10 sm:px-7">
              <div className="card px-4 py-8 text-center">
                <h2 id="lab-empty" className="text-[15px] font-semibold text-ink">
                  Nothing in the Lab yet.
                </h2>
                <p className="mx-auto mt-1 max-w-[46ch] text-[13px] leading-[1.7] text-muted">
                  When a project is ready, it will show up here with its repo and a link to try
                  it.
                </p>
                <a
                  href={BASE}
                  className="link mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px]"
                >
                  Back to the main site
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </section>
          ) : (
            <>
              {!filtersActive && featuredProjects.length > 0 ? (
                <section aria-labelledby="lab-featured" className="border-t border-dashed border-line px-4 pb-8 pt-5 sm:px-7">
                  <div className="flex items-center justify-between gap-4">
                    <h2
                      id="lab-featured"
                      className="flex items-center gap-2 text-[16.5px] font-semibold tracking-[-0.012em] text-ink"
                    >
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                      Featured
                    </h2>
                    <span className="mono hidden text-[12px] uppercase tracking-[0.14em] text-faint sm:block">
                      {featuredProjects.length} selected
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {featuredProjects.map((project) => (
                      <ProjectCard key={project.fullName} project={project} />
                    ))}
                  </div>
                </section>
              ) : null}

              <section
                aria-labelledby="lab-all"
                className="border-t border-dashed border-line px-4 pb-10 pt-5 sm:px-7"
              >
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <h2
                    id="lab-all"
                    className="flex items-center gap-2 text-[16.5px] font-semibold tracking-[-0.012em] text-ink"
                  >
                    <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                    All projects
                  </h2>
                  <p
                    className="mono text-[12px] text-faint"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {isFiltered
                      ? `${filtered.length} of ${allProjects.length} projects`
                      : `${allProjects.length} project${allProjects.length === 1 ? '' : 's'}`}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label
                      htmlFor="lab-search"
                      className="mono block text-[12px] uppercase tracking-[0.12em] text-faint"
                    >
                      Search
                    </label>
                    <input
                      id="lab-search"
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Name, topic, language…"
                      className="lab-control mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lab-status"
                      className="mono block text-[12px] uppercase tracking-[0.12em] text-faint"
                    >
                      Status
                    </label>
                    <select
                      id="lab-status"
                      value={status}
                      onChange={(event) => setStatus(event.target.value as LabStatus | typeof ALL)}
                      className="lab-control mt-1"
                    >
                      <option value={ALL}>All statuses</option>
                      {statusOptions.map((item) => (
                        <option key={item} value={item}>
                          {statusLabels[item]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lab-topic"
                      className="mono block text-[12px] uppercase tracking-[0.12em] text-faint"
                    >
                      Topic
                    </label>
                    <select
                      id="lab-topic"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      className="lab-control mt-1"
                    >
                      <option value={ALL}>All topics</option>
                      {topics.map((item) => (
                        <option key={item} value={item}>
                          #{item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="lab-language"
                      className="mono block text-[12px] uppercase tracking-[0.12em] text-faint"
                    >
                      Language
                    </label>
                    <select
                      id="lab-language"
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="lab-control mt-1"
                    >
                      <option value={ALL}>All languages</option>
                      {languages.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:items-end">
                    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-muted">
                      <input
                        type="checkbox"
                        checked={showArchived}
                        onChange={(event) => setShowArchived(event.target.checked)}
                        className="lab-checkbox h-4 w-4"
                      />
                      Show archived
                    </label>
                    {filtersActive || showArchived ? (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mono inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.1em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                      >
                        Clear filters
                      </button>
                    ) : null}
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="card mt-6 px-4 py-8 text-center">
                    <p className="text-[14px] font-medium text-ink">
                      No projects match these filters.
                    </p>
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="link mt-3 inline-flex min-h-11 items-center text-[13px]"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <>
                    <ul className="mt-5 grid list-none gap-3 p-0 sm:grid-cols-2">
                      {shown.map((project) => (
                        <li key={project.fullName} className="h-full">
                          <ProjectCard project={project} />
                        </li>
                      ))}
                    </ul>

                    {hasMore ? (
                      <div className="mt-5 flex flex-col items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setLimit((current) => current + PAGE_SIZE)}
                          className="mono inline-flex min-h-11 items-center rounded-md border border-dashed border-line px-4 text-[12px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-ink/40 hover:text-ink"
                        >
                          Load more
                        </button>
                        <p className="mono text-[12px] text-faint">
                          Showing {shown.length} of {filtered.length}
                        </p>
                      </div>
                    ) : null}
                  </>
                )}
              </section>
            </>
          )}
        </main>
        <Footer />
      </div>
      <BottomNav page="lab" />
    </>
  );
}

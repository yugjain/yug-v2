import { ArrowUpRight } from '../components/Icons';
import { formatShipped, statusLabels } from './data';
import type { LabProject } from './types';

/**
 * One project card, used by the home strip and the Lab list. The screenshot
 * slot has a fixed 16:10 frame and explicit dimensions, so lazy loading can
 * never move the text around it.
 */
export default function ProjectCard({
  project,
  compact = false,
}: {
  project: LabProject;
  compact?: boolean;
}) {
  const shipped = formatShipped(project.shippedAt);
  const topics = compact ? [] : project.topics.slice(0, 3);

  return (
    <article className="card flex h-full flex-col overflow-hidden transition-colors hover:border-ink/30">
      {project.screenshot ? (
        <div className="aspect-[16/10] w-full overflow-hidden border-b border-dashed border-line bg-line/20">
          <img
            src={project.screenshot}
            alt={`${project.name} preview`}
            width={1280}
            height={800}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {project.name}
          </h3>
          {project.status ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[12px] leading-normal text-muted">
              <span
                aria-hidden="true"
                className={`status-dot status-${project.status}`}
              />
              {statusLabels[project.status]}
            </span>
          ) : null}
        </div>

        {project.oneLiner ? (
          <p className="text-[13px] leading-[1.6] text-muted">{project.oneLiner}</p>
        ) : null}

        {shipped || project.language || topics.length ? (
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[12px] text-faint">
            {shipped ? <span className="mono">{shipped}</span> : null}
            {project.language ? <span>{project.language}</span> : null}
            {topics.map((topic) => (
              <span key={topic}>#{topic}</span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5 text-[12px]">
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              Demo
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-1 text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Repo
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}

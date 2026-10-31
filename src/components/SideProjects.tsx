import { BASE } from '../content';
import { featuredProjects, remainingProjects } from '../lab/data';
import ProjectCard from '../lab/ProjectCard';
import { ArrowRight } from './Icons';
import Section from './Section';

/**
 * Home teaser for the Lab. With no featured projects the whole section is
 * absent: no heading, no empty frame, no "coming soon".
 */
export default function SideProjects() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section id="side" eyebrow="Lab" title="Built on the side" hint="Featured">
      <div className="grid gap-3 sm:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.fullName} project={project} compact />
        ))}
      </div>

      {remainingProjects > 0 ? (
        <a
          href={`${BASE}lab/`}
          className="link mt-4 inline-flex min-h-11 items-center gap-1.5 text-[13px]"
        >
          {remainingProjects} more experiment{remainingProjects === 1 ? '' : 's'} in the Lab
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </Section>
  );
}

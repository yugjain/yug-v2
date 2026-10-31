import { labData } from '../generated/lab';
import type { LabProject, LabStatus } from './types';

/**
 * All Lab projects, newest shipped first. The build script has already
 * removed hidden projects and applied the overrides.
 */
export const allProjects: LabProject[] = [...labData.projects].sort((a, b) => {
  const at = a.shippedAt ? Date.parse(a.shippedAt) : Number.NEGATIVE_INFINITY;
  const bt = b.shippedAt ? Date.parse(b.shippedAt) : Number.NEGATIVE_INFINITY;
  if (at !== bt) return bt - at;
  return a.name.localeCompare(b.name);
});

/** The newest featured, non-archived projects. The home section shows at most three. */
export const featuredProjects = allProjects
  .filter((project) => project.featured && !project.archived)
  .slice(0, 3);

/**
 * Projects beyond the featured cards. Archived projects are excluded because
 * the Lab hides them by default; the count should match what a visitor can
 * actually browse.
 */
export const remainingProjects = Math.max(
  0,
  allProjects.filter((project) => !project.archived).length - featuredProjects.length,
);

export const statusOrder: LabStatus[] = ['live', 'prototype', 'experiment', 'archived'];

export const statusLabels: Record<LabStatus, string> = {
  live: 'Live',
  prototype: 'Prototype',
  experiment: 'Experiment',
  archived: 'Archived',
};

const shippedFormatter = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Shipped date only: first release, or the repo's creation date. */
export function formatShipped(value: string | null): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : shippedFormatter.format(date);
}

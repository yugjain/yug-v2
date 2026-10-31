export type LabStatus = 'live' | 'prototype' | 'experiment' | 'archived';

export type LabProject = {
  name: string;
  fullName: string;
  description: string | null;
  oneLiner: string | null;
  topics: string[];
  language: string | null;
  htmlUrl: string;
  demoUrl: string | null;
  screenshot: string | null;
  status: LabStatus | null;
  featured: boolean;
  archived: boolean;
  shippedAt: string | null;
};

export type LabData = {
  meta: {
    fetchedAt: string | null;
    source: string;
  };
  projects: LabProject[];
};

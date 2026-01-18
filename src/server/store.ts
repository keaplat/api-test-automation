import { randomUUID } from 'node:crypto';

import type { CreateProjectPayload, Project, UpdateProjectPayload } from '@models/project';

const projects = new Map<string, Project>();

function seedProjects(): void {
  if (projects.size > 0) {
    return;
  }

  const seeded: Project[] = [
    {
      createdAt: new Date().toISOString(),
      id: randomUUID(),
      name: 'Payments regression hardening',
      owner: 'qa.lead@example.com',
      priority: 'high',
      status: 'active'
    },
    {
      createdAt: new Date().toISOString(),
      id: randomUUID(),
      name: 'Checkout smoke baseline',
      owner: 'qa.automation@example.com',
      priority: 'medium',
      status: 'draft'
    }
  ];

  seeded.forEach((project) => projects.set(project.id, project));
}

seedProjects();

export function listProjects(): Project[] {
  return Array.from(projects.values());
}

export function getProjectById(id: string): Project | undefined {
  return projects.get(id);
}

export function createProject(payload: CreateProjectPayload): Project {
  const project: Project = {
    createdAt: new Date().toISOString(),
    id: randomUUID(),
    name: payload.name,
    owner: payload.owner,
    priority: payload.priority,
    status: 'draft'
  };

  projects.set(project.id, project);
  return project;
}

export function updateProject(id: string, payload: UpdateProjectPayload): Project | undefined {
  const project = projects.get(id);

  if (!project) {
    return undefined;
  }

  const updatedProject: Project = {
    ...project,
    ...payload
  };

  projects.set(id, updatedProject);
  return updatedProject;
}

export function deleteProject(id: string): boolean {
  return projects.delete(id);
}

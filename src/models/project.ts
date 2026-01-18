export type ProjectStatus = 'draft' | 'active' | 'archived';

export type Project = {
  createdAt: string;
  id: string;
  name: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  status: ProjectStatus;
};

export type CreateProjectPayload = Pick<Project, 'name' | 'owner' | 'priority'>;

export type UpdateProjectPayload = Partial<Pick<Project, 'name' | 'owner' | 'priority' | 'status'>>;

export type LoginPayload = {
  email: string;
  password: string;
};

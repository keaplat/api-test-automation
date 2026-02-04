import type { APIRequestContext, APIResponse } from '@playwright/test';

import type { CreateProjectPayload, LoginPayload, UpdateProjectPayload } from '@models/project';

export class ProjectsApiClient {
  constructor(private readonly request: APIRequestContext, private token?: string) {}

  async login(credentials: LoginPayload): Promise<APIResponse> {
    const response = await this.request.post('/api/auth/login', {
      data: credentials
    });

    if (response.ok()) {
      const body = (await response.json()) as { token: string };
      this.token = body.token;
    }

    return response;
  }

  listProjects(): Promise<APIResponse> {
    return this.request.get('/api/projects', {
      headers: this.authorizationHeader()
    });
  }

  createProject(payload: CreateProjectPayload): Promise<APIResponse> {
    return this.request.post('/api/projects', {
      data: payload,
      headers: this.authorizationHeader()
    });
  }

  getProject(id: string): Promise<APIResponse> {
    return this.request.get(`/api/projects/${id}`, {
      headers: this.authorizationHeader()
    });
  }

  updateProject(id: string, payload: UpdateProjectPayload): Promise<APIResponse> {
    return this.request.patch(`/api/projects/${id}`, {
      data: payload,
      headers: this.authorizationHeader()
    });
  }

  deleteProject(id: string): Promise<APIResponse> {
    return this.request.delete(`/api/projects/${id}`, {
      headers: this.authorizationHeader()
    });
  }

  health(): Promise<APIResponse> {
    return this.request.get('/health');
  }

  private authorizationHeader(): Record<string, string> | undefined {
    return this.token ? { Authorization: `Bearer ${this.token}` } : undefined;
  }
}

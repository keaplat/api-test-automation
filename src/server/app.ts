import express from 'express';
import { z } from 'zod';

import { authorize, login } from '@server/auth';
import { createProject, deleteProject, getProjectById, listProjects, updateProject } from '@server/store';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const createProjectSchema = z.object({
  name: z.string().min(4),
  owner: z.string().email(),
  priority: z.enum(['high', 'medium', 'low'])
});

const updateProjectSchema = z.object({
  name: z.string().min(4).optional(),
  owner: z.string().email().optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  status: z.enum(['draft', 'active', 'archived']).optional()
});

export function createApp() {
  const app = express();

  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.status(200).json({
      service: 'api-test-automation',
      status: 'ok'
    });
  });

  app.post('/api/auth/login', (request, response) => {
    const parsed = loginSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        error: 'ValidationError',
        details: parsed.error.flatten()
      });
      return;
    }

    const result = login(parsed.data);

    if (!result) {
      response.status(401).json({
        error: 'InvalidCredentials',
        message: 'Email or password is invalid.'
      });
      return;
    }

    response.status(200).json(result);
  });

  app.get('/api/projects', (request, response) => {
    if (!authorize(request, response)) {
      return;
    }

    response.status(200).json(listProjects());
  });

  app.post('/api/projects', (request, response) => {
    if (!authorize(request, response)) {
      return;
    }

    const parsed = createProjectSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        error: 'ValidationError',
        details: parsed.error.flatten()
      });
      return;
    }

    response.status(201).json(createProject(parsed.data));
  });

  app.get('/api/projects/:id', (request, response) => {
    if (!authorize(request, response)) {
      return;
    }

    const project = getProjectById(request.params.id);

    if (!project) {
      response.status(404).json({
        error: 'NotFound',
        message: 'Project not found.'
      });
      return;
    }

    response.status(200).json(project);
  });

  app.patch('/api/projects/:id', (request, response) => {
    if (!authorize(request, response)) {
      return;
    }

    const parsed = updateProjectSchema.safeParse(request.body);

    if (!parsed.success) {
      response.status(400).json({
        error: 'ValidationError',
        details: parsed.error.flatten()
      });
      return;
    }

    const project = updateProject(request.params.id, parsed.data);

    if (!project) {
      response.status(404).json({
        error: 'NotFound',
        message: 'Project not found.'
      });
      return;
    }

    response.status(200).json(project);
  });

  app.delete('/api/projects/:id', (request, response) => {
    if (!authorize(request, response)) {
      return;
    }

    const deleted = deleteProject(request.params.id);

    if (!deleted) {
      response.status(404).json({
        error: 'NotFound',
        message: 'Project not found.'
      });
      return;
    }

    response.status(204).send();
  });

  return app;
}

import { makeProjectPayload } from '@data/factories/projectFactory';
import { loginResponseSchema, projectListSchema, projectSchema } from '@api/schemas';
import { expect, test } from '@fixtures/test-base';

test.describe('Projects API suite', () => {
  test('should respond healthy for smoke validation @smoke', async ({ apiClient }) => {
    const response = await apiClient.health();
    const body = (await response.json()) as { service: string; status: string };

    expect(response.status()).toBe(200);
    expect(body).toEqual({
      service: 'api-test-automation',
      status: 'ok'
    });
  });

  test('should authenticate successfully and return a token @smoke', async ({ apiClient }) => {
    const response = await apiClient.login({
      email: 'qa.lead@example.com',
      password: 'Secret123!'
    });

    expect(response.status()).toBe(200);
    loginResponseSchema.parse(await response.json());
  });

  test('should reject access to projects without a bearer token', async ({ apiClient }) => {
    const response = await apiClient.listProjects();
    const body = (await response.json()) as { error: string; message: string };

    expect(response.status()).toBe(401);
    expect(body.error).toBe('Unauthorized');
  });

  test('should create, update and delete a project end to end', async ({ apiClient }) => {
    await apiClient.login({
      email: 'qa.lead@example.com',
      password: 'Secret123!'
    });

    const createResponse = await apiClient.createProject(makeProjectPayload());
    expect(createResponse.status()).toBe(201);
    const createdProject = projectSchema.parse(await createResponse.json());

    const listResponse = await apiClient.listProjects();
    expect(listResponse.status()).toBe(200);
    const list = projectListSchema.parse(await listResponse.json());
    expect(list.some((project) => project.id === createdProject.id)).toBeTruthy();

    const updateResponse = await apiClient.updateProject(createdProject.id, {
      status: 'active',
      priority: 'medium'
    });
    expect(updateResponse.status()).toBe(200);
    const updatedProject = projectSchema.parse(await updateResponse.json());
    expect(updatedProject.status).toBe('active');
    expect(updatedProject.priority).toBe('medium');

    const deleteResponse = await apiClient.deleteProject(createdProject.id);
    expect(deleteResponse.status()).toBe(204);

    const getDeletedResponse = await apiClient.getProject(createdProject.id);
    expect(getDeletedResponse.status()).toBe(404);
  });

  test('should reject malformed payloads with validation errors', async ({ apiClient }) => {
    await apiClient.login({
      email: 'qa.lead@example.com',
      password: 'Secret123!'
    });

    const response = await apiClient.createProject({
      name: 'bad',
      owner: 'not-an-email',
      priority: 'high'
    });

    expect(response.status()).toBe(400);
    const body = (await response.json()) as { error: string };
    expect(body.error).toBe('ValidationError');
  });
});

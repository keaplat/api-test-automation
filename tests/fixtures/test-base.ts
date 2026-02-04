import { test as base } from '@playwright/test';

import { ProjectsApiClient } from '@api/ProjectsApiClient';

type ApiFixtures = {
  apiClient: ProjectsApiClient;
};

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ProjectsApiClient(request));
  }
});

export { expect } from '@playwright/test';

import { randomUUID } from 'node:crypto';

import type { CreateProjectPayload } from '@models/project';

export function makeProjectPayload(overrides: Partial<CreateProjectPayload> = {}): CreateProjectPayload {
  const suffix = randomUUID().slice(0, 8);

  return {
    name: `QA API Project ${suffix}`,
    owner: `owner.${suffix}@example.com`,
    priority: 'high',
    ...overrides
  };
}

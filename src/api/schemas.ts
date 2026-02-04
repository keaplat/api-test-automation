import { z } from 'zod';

export const loginResponseSchema = z.object({
  token: z.string().min(1)
});

export const projectSchema = z.object({
  createdAt: z.string().datetime(),
  id: z.string().uuid(),
  name: z.string().min(4),
  owner: z.string().email(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['draft', 'active', 'archived'])
});

export const projectListSchema = z.array(projectSchema);

export const errorSchema = z.object({
  error: z.string(),
  message: z.string().optional()
});

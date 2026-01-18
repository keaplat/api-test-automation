import type { Request, Response } from 'express';

import type { LoginPayload } from '@models/project';

const validCredentials: LoginPayload = {
  email: 'qa.lead@example.com',
  password: 'Secret123!'
};

const staticToken = 'qa-suite-token';

export function login(payload: LoginPayload): { token: string } | null {
  if (payload.email === validCredentials.email && payload.password === validCredentials.password) {
    return { token: staticToken };
  }

  return null;
}

export function authorize(request: Request, response: Response): boolean {
  const authorization = request.headers.authorization;

  if (authorization !== `Bearer ${staticToken}`) {
    response.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or invalid bearer token.'
    });
    return false;
  }

  return true;
}

# API Test Automation

Professional API automation suite built to look and behave like production-facing QA work rather than tutorial code.

## Scope

- Authenticated REST API with login and bearer token flow.
- CRUD coverage for a `projects` resource.
- Positive and negative scenarios.
- Schema validation with `zod`.
- Dynamic test data factories.
- HTML reporting with Playwright.
- CI execution with GitHub Actions.

## Stack

- Playwright API testing
- TypeScript
- Express
- Zod
- GitHub Actions

## API covered

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/login` | Authenticate and issue bearer token |
| `GET /health` | Health check for smoke validation |
| `GET /api/projects` | List projects |
| `POST /api/projects` | Create project |
| `GET /api/projects/:id` | Fetch a specific project |
| `PATCH /api/projects/:id` | Update status and metadata |
| `DELETE /api/projects/:id` | Remove project |

## Project structure

```text
.
|-- src
|   |-- api
|   |   |-- ProjectsApiClient.ts
|   |   `-- schemas.ts
|   |-- data
|   |   `-- factories
|   |       `-- projectFactory.ts
|   |-- models
|   |   `-- project.ts
|   `-- server
|       |-- app.ts
|       |-- auth.ts
|       |-- index.ts
|       `-- store.ts
|-- tests
|   |-- api
|   |   `-- projects-api.spec.ts
|   `-- fixtures
|       `-- test-base.ts
`-- .github
    `-- workflows
        `-- api-tests.yml
```

## How to run

```bash
npm install
npm test
```

## Test strategy

- Smoke covers `health` and successful authentication.
- Regression covers authenticated CRUD and negative cases.
- Contracts are validated with runtime schema checks.
- Data is generated dynamically to avoid hard-coded collisions.

## CI

The workflow runs on pushes to `main`, pull requests, and can be extended to scheduled regression later. It uploads the Playwright HTML report as an artifact.

# API Test Automation

Suíte profissional de automação de API, construída para se parecer e se comportar como um trabalho real de QA voltado para produção, e não como código de tutorial.

## Escopo

- API REST autenticada com fluxo de login e bearer token
- Cobertura CRUD para o recurso de projetos
- Cenários positivos e negativos
- Validação de schema com Zod
- Fábricas de dados dinâmicos para teste
- Relatórios HTML com Playwright
- Execução em CI com GitHub Actions

## Stack

- Playwright API testing
- TypeScript
- Express
- Zod
- GitHub Actions

## API coberta

| Endpoint | Finalidade |
|---|---|
| `POST /api/auth/login` | Autenticar e emitir bearer token |
| `GET /health` | Health check para validação smoke |
| `GET /api/projects` | Listar projetos |
| `POST /api/projects` | Criar projeto |
| `GET /api/projects/:id` | Buscar um projeto específico |
| `PATCH /api/projects/:id` | Atualizar status e metadados |
| `DELETE /api/projects/:id` | Remover projeto |

## Estrutura do projeto

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

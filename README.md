# Incubyte Salary Management API

REST API for employee salary management, built with strict TDD for the Incubyte kata.

## Tech stack

- Node.js
- Express
- TypeScript
- SQLite (`better-sqlite3`)
- Jest + Supertest

## Prerequisites

- Node.js 18 or later
- npm

## Setup

```bash
npm install
npm run build
```

## Run

Development (watch mode):

```bash
npm run dev
```

Production (run from project root after build):

```bash
npm start
```

Default port: `3000` (override with `PORT`).

## Docker

Build and run without installing Node.js locally:

```bash
docker build -t incubyte-salary-api .
docker run -p 3000:3000 incubyte-salary-api
```

Persist the SQLite database on the host:

```bash
docker run -p 3000:3000 -v incubyte-data:/app/data incubyte-salary-api
```

Health check:

```bash
curl http://localhost:3000/health
```

## Test

```bash
npm test
npm run typecheck
```

Tests use an in-memory SQLite database. The application uses `./data/dev.sqlite` in development.

## Database

On server startup, the app runs `src/infrastructure/database/migrations/001_create_employees.sql`, which creates the `employees` table with `IF NOT EXISTS`.

## API endpoints

### Health

| Method | Path | Success |
|--------|------|---------|
| GET | `/health` | 200 `{ "status": "ok" }` |

### Employees

| Method | Path | Success |
|--------|------|---------|
| POST | `/employees` | 201 employee object |
| GET | `/employees` | 200 array of employees |
| GET | `/employees/:id` | 200 employee object |
| PUT | `/employees/:id` | 200 updated employee object |
| DELETE | `/employees/:id` | 204 empty body |
| GET | `/employees/:id/salary` | 200 salary breakdown |

**Employee object:**

```json
{
  "id": 1,
  "fullName": "Jane Doe",
  "jobTitle": "Software Engineer",
  "country": "India",
  "salary": 50000
}
```

### Metrics

| Method | Path | Success |
|--------|------|---------|
| GET | `/metrics/countries/:country` | 200 `{ minSalary, maxSalary, averageSalary }` |
| GET | `/metrics/job-titles/:jobTitle` | 200 `{ averageSalary }` |

### Errors

All errors use:

```json
{ "error": "message" }
```

Common cases:

- `404` — `{ "error": "Employee not found" }`
- `404` — `{ "error": "No employees found" }` (metrics)
- `400` — validation errors on `POST /employees`

## Salary deduction rules

`GET /employees/:id/salary` returns:

```json
{
  "grossSalary": 50000,
  "deductions": 5000,
  "netSalary": 45000
}
```

| Country | Deduction |
|---------|-----------|
| `India` | 10% |
| `United States` | 12% |
| Any other country | 0% |

Use exact country strings (`India`, `United States`) for correct deduction rates.

## AI usage disclosure

This project was developed with assistance from AI coding tools (Cursor / Claude) for:

- Project scaffolding and Phase 0 setup
- Test-driven development (failing tests first, then minimal implementation)
- Incremental commits per feature slice
- Controlled refactoring (mapper, salary helper, repositories)
- Documentation and production polish

All code was reviewed, tests were run after each step, and API behavior was kept aligned with the kata requirements. AI suggestions that added unnecessary complexity were rejected in favor of simple functions and a flat folder structure.

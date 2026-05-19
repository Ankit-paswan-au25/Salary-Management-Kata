import { closeDb, getDb } from '../../src/infrastructure/database/connection';

const EMPLOYEES_DDL = `
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    country TEXT NOT NULL,
    salary INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`;

export function resetTestDb(): void {
  closeDb();
  const db = getDb();
  db.exec(EMPLOYEES_DDL);
  db.exec('DELETE FROM employees');
}

export function insertEmployee(employee: {
  fullName: string;
  jobTitle: string;
  country: string;
  salary: number;
}): number {
  const result = getDb()
    .prepare(
      `INSERT INTO employees (full_name, job_title, country, salary)
       VALUES (@fullName, @jobTitle, @country, @salary)`,
    )
    .run(employee);
  return Number(result.lastInsertRowid);
}

export function findEmployeeById(id: number): {
  id: number;
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
} | undefined {
  return getDb()
    .prepare(
      'SELECT id, full_name, job_title, country, salary FROM employees WHERE id = ?',
    )
    .get(id) as
    | {
        id: number;
        full_name: string;
        job_title: string;
        country: string;
        salary: number;
      }
    | undefined;
}

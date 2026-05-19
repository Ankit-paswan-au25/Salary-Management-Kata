import { closeDb, getDb } from '../../src/infrastructure/database/connection';
import { getEmployeesMigrationSql } from '../../src/infrastructure/database/migrate';

export function resetTestDb(): void {
  closeDb();
  const db = getDb();
  db.exec(getEmployeesMigrationSql());
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

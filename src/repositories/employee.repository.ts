import { EmployeeRow } from '../domain/employee.types';
import { getDb } from '../infrastructure/database/connection';

export type EmployeeInput = {
  fullName: string;
  jobTitle: string;
  country: string;
  salary: number;
};

export type EmployeeCountrySalary = {
  country: string;
  salary: number;
};

export function findAllEmployees(): EmployeeRow[] {
  return getDb()
    .prepare(
      'SELECT id, full_name, job_title, country, salary FROM employees ORDER BY id',
    )
    .all() as EmployeeRow[];
}

export function findEmployeeById(id: number): EmployeeRow | undefined {
  return getDb()
    .prepare(
      'SELECT id, full_name, job_title, country, salary FROM employees WHERE id = ?',
    )
    .get(id) as EmployeeRow | undefined;
}

export function findEmployeeCountryAndSalaryById(
  id: number,
): EmployeeCountrySalary | undefined {
  return getDb()
    .prepare('SELECT country, salary FROM employees WHERE id = ?')
    .get(id) as EmployeeCountrySalary | undefined;
}

export function createEmployee(input: EmployeeInput): number {
  const result = getDb()
    .prepare(
      `INSERT INTO employees (full_name, job_title, country, salary)
       VALUES (@fullName, @jobTitle, @country, @salary)`,
    )
    .run(input);

  return Number(result.lastInsertRowid);
}

export function updateEmployee(id: number, input: EmployeeInput): number {
  const result = getDb()
    .prepare(
      `UPDATE employees
       SET full_name = @fullName, job_title = @jobTitle, country = @country, salary = @salary
       WHERE id = @id`,
    )
    .run({ id, ...input });

  return result.changes;
}

export function deleteEmployeeById(id: number): number {
  const result = getDb()
    .prepare('DELETE FROM employees WHERE id = ?')
    .run(id);

  return result.changes;
}

import { Employee, EmployeeRow } from '../domain/employee.types';

export function toEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    fullName: row.full_name,
    jobTitle: row.job_title,
    country: row.country,
    salary: row.salary,
  };
}

export function toEmployees(rows: EmployeeRow[]): Employee[] {
  return rows.map(toEmployee);
}

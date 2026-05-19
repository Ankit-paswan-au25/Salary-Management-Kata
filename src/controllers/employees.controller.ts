import { Request, Response } from 'express';
import { getDb } from '../infrastructure/database/connection';

type EmployeeRow = {
  id: number;
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
};

export function getEmployeeById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const row = getDb()
    .prepare(
      'SELECT id, full_name, job_title, country, salary FROM employees WHERE id = ?',
    )
    .get(id) as EmployeeRow | undefined;

  if (!row) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }

  res.status(200).json({
    id: row.id,
    fullName: row.full_name,
    jobTitle: row.job_title,
    country: row.country,
    salary: row.salary,
  });
}

export function updateEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const { fullName, jobTitle, country, salary } = req.body;

  const result = getDb()
    .prepare(
      `UPDATE employees
       SET full_name = @fullName, job_title = @jobTitle, country = @country, salary = @salary
       WHERE id = @id`,
    )
    .run({ id, fullName, jobTitle, country, salary });

  if (result.changes === 0) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }

  res.status(200).json({
    id,
    fullName,
    jobTitle,
    country,
    salary,
  });
}

export function listEmployees(_req: Request, res: Response): void {
  const rows = getDb()
    .prepare(
      'SELECT id, full_name, job_title, country, salary FROM employees ORDER BY id',
    )
    .all() as EmployeeRow[];

  res.status(200).json(
    rows.map((row) => ({
      id: row.id,
      fullName: row.full_name,
      jobTitle: row.job_title,
      country: row.country,
      salary: row.salary,
    })),
  );
}

export function createEmployee(req: Request, res: Response): void {
  const { fullName, jobTitle, country, salary } = req.body;

  if (fullName === undefined) {
    res.status(400).json({ error: 'fullName is required' });
    return;
  }
  if (jobTitle === undefined) {
    res.status(400).json({ error: 'jobTitle is required' });
    return;
  }
  if (country === undefined) {
    res.status(400).json({ error: 'country is required' });
    return;
  }
  if (salary < 0) {
    res.status(400).json({ error: 'salary must be non-negative' });
    return;
  }

  const result = getDb()
    .prepare(
      `INSERT INTO employees (full_name, job_title, country, salary)
       VALUES (@fullName, @jobTitle, @country, @salary)`,
    )
    .run({ fullName, jobTitle, country, salary });

  res.status(201).json({
    id: Number(result.lastInsertRowid),
    fullName,
    jobTitle,
    country,
    salary,
  });
}

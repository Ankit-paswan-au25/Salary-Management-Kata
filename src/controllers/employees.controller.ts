import { Request, Response } from 'express';
import { getDb } from '../infrastructure/database/connection';

type EmployeeRow = {
  id: number;
  full_name: string;
  job_title: string;
  country: string;
  salary: number;
};

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

import { Request, Response } from 'express';
import { getDb } from '../infrastructure/database/connection';

export function createEmployee(req: Request, res: Response): void {
  const { fullName, jobTitle, country, salary } = req.body;

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

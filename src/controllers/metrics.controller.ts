import { Request, Response } from 'express';
import { getDb } from '../infrastructure/database/connection';

export function getCountryMetrics(req: Request, res: Response): void {
  const { country } = req.params;

  const row = getDb()
    .prepare(
      `SELECT COUNT(*) as count,
              MIN(salary) as minSalary,
              MAX(salary) as maxSalary,
              AVG(salary) as averageSalary
       FROM employees
       WHERE country = ?`,
    )
    .get(country) as
    | {
        count: number;
        minSalary: number;
        maxSalary: number;
        averageSalary: number;
      }
    | undefined;

  if (!row || row.count === 0) {
    res.status(404).json({ error: 'No employees found' });
    return;
  }

  res.status(200).json({
    minSalary: row.minSalary,
    maxSalary: row.maxSalary,
    averageSalary: row.averageSalary,
  });
}

export function getJobTitleMetrics(req: Request, res: Response): void {
  const { jobTitle } = req.params;

  const row = getDb()
    .prepare(
      `SELECT COUNT(*) as count, AVG(salary) as averageSalary
       FROM employees
       WHERE job_title = ?`,
    )
    .get(jobTitle) as { count: number; averageSalary: number } | undefined;

  if (!row || row.count === 0) {
    res.status(404).json({ error: 'No employees found' });
    return;
  }

  res.status(200).json({
    averageSalary: row.averageSalary,
  });
}

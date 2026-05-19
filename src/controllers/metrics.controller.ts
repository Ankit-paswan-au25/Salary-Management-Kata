import { Request, Response } from 'express';
import {
  findCountryMetrics,
  findJobTitleMetrics,
} from '../repositories/metrics.repository';

export function getCountryMetrics(req: Request, res: Response): void {
  const country = req.params.country as string;
  const row = findCountryMetrics(country);

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
  const jobTitle = req.params.jobTitle as string;
  const row = findJobTitleMetrics(jobTitle);

  if (!row || row.count === 0) {
    res.status(404).json({ error: 'No employees found' });
    return;
  }

  res.status(200).json({
    averageSalary: row.averageSalary,
  });
}

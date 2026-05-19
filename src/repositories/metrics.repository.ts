import { getDb } from '../infrastructure/database/connection';

export type CountryMetricsRow = {
  count: number;
  minSalary: number;
  maxSalary: number;
  averageSalary: number;
};

export type JobTitleMetricsRow = {
  count: number;
  averageSalary: number;
};

export function findCountryMetrics(
  country: string,
): CountryMetricsRow | undefined {
  return getDb()
    .prepare(
      `SELECT COUNT(*) as count,
              MIN(salary) as minSalary,
              MAX(salary) as maxSalary,
              AVG(salary) as averageSalary
       FROM employees
       WHERE country = ?`,
    )
    .get(country) as CountryMetricsRow | undefined;
}

export function findJobTitleMetrics(
  jobTitle: string,
): JobTitleMetricsRow | undefined {
  return getDb()
    .prepare(
      `SELECT COUNT(*) as count, AVG(salary) as averageSalary
       FROM employees
       WHERE job_title = ?`,
    )
    .get(jobTitle) as JobTitleMetricsRow | undefined;
}

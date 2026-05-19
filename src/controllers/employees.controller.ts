import { Request, Response } from 'express';
import { calculateSalary } from '../lib/salary';
import { toEmployee, toEmployees } from '../mappers/employee.mapper';
import {
  createEmployee as createEmployeeRecord,
  deleteEmployeeById,
  findAllEmployees,
  findEmployeeById,
  findEmployeeCountryAndSalaryById,
  updateEmployee as updateEmployeeRecord,
} from '../repositories/employee.repository';

export function getEmployeeSalary(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const row = findEmployeeCountryAndSalaryById(id);

  if (!row) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }

  res.status(200).json(calculateSalary(row.salary, row.country));
}

export function getEmployeeById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const row = findEmployeeById(id);

  if (!row) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }

  res.status(200).json(toEmployee(row));
}

export function updateEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const { fullName, jobTitle, country, salary } = req.body;

  const changes = updateEmployeeRecord(id, {
    fullName,
    jobTitle,
    country,
    salary,
  });

  if (changes === 0) {
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

export function deleteEmployee(req: Request, res: Response): void {
  const id = Number(req.params.id);

  const changes = deleteEmployeeById(id);

  if (changes === 0) {
    res.status(404).json({ error: 'Employee not found' });
    return;
  }

  res.status(204).send();
}

export function listEmployees(_req: Request, res: Response): void {
  const rows = findAllEmployees();
  res.status(200).json(toEmployees(rows));
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

  const id = createEmployeeRecord({ fullName, jobTitle, country, salary });

  res.status(201).json({
    id,
    fullName,
    jobTitle,
    country,
    salary,
  });
}

import request from 'supertest';
import { createApp } from '../src/app';
import { insertEmployee, resetTestDb } from './helpers/test-db';

describe('GET /employees/:id/salary', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('calculates salary for India employee with 10% deduction', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      grossSalary: 50000,
      deductions: 5000,
      netSalary: 45000,
    });
  });

  it('calculates salary for United States employee with 12% deduction', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'John Smith',
      jobTitle: 'Product Manager',
      country: 'United States',
      salary: 80000,
    });

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      grossSalary: 80000,
      deductions: 9600,
      netSalary: 70400,
    });
  });

  it('calculates salary for other country employee with no deduction', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'Alex Lee',
      jobTitle: 'Designer',
      country: 'Canada',
      salary: 60000,
    });

    const response = await request(app).get(`/employees/${id}/salary`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      grossSalary: 60000,
      deductions: 0,
      netSalary: 60000,
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const app = createApp();

    const response = await request(app).get('/employees/999/salary');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Employee not found' });
  });
});

import request from 'supertest';
import { createApp } from '../src/app';
import { insertEmployee, resetTestDb } from './helpers/test-db';

describe('GET /metrics/countries/:country', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('returns country salary metrics', async () => {
    const app = createApp();
    insertEmployee({
      fullName: 'Alice',
      jobTitle: 'Engineer',
      country: 'India',
      salary: 40000,
    });
    insertEmployee({
      fullName: 'Bob',
      jobTitle: 'Manager',
      country: 'India',
      salary: 60000,
    });
    insertEmployee({
      fullName: 'Carol',
      jobTitle: 'Analyst',
      country: 'India',
      salary: 50000,
    });
    insertEmployee({
      fullName: 'Dave',
      jobTitle: 'Engineer',
      country: 'Canada',
      salary: 90000,
    });

    const response = await request(app).get('/metrics/countries/India');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      minSalary: 40000,
      maxSalary: 60000,
      averageSalary: 50000,
    });
  });

  it('returns error when no employees exist for country', async () => {
    const app = createApp();

    const response = await request(app).get('/metrics/countries/France');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'No employees found' });
  });
});

describe('GET /metrics/job-titles/:jobTitle', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('returns average salary for job title', async () => {
    const app = createApp();
    const jobTitle = 'Software Engineer';
    insertEmployee({
      fullName: 'Alice',
      jobTitle,
      country: 'India',
      salary: 50000,
    });
    insertEmployee({
      fullName: 'Bob',
      jobTitle,
      country: 'United States',
      salary: 70000,
    });
    insertEmployee({
      fullName: 'Carol',
      jobTitle: 'Product Manager',
      country: 'India',
      salary: 80000,
    });

    const response = await request(app).get(
      `/metrics/job-titles/${encodeURIComponent(jobTitle)}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      averageSalary: 60000,
    });
  });

  it('returns error when no employees exist for job title', async () => {
    const app = createApp();

    const response = await request(app).get(
      '/metrics/job-titles/Designer',
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'No employees found' });
  });
});

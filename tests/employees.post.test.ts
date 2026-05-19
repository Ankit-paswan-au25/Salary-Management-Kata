import request from 'supertest';
import { createApp } from '../src/app';
import { findEmployeeById, resetTestDb } from './helpers/test-db';

const validEmployee = {
  fullName: 'Jane Doe',
  jobTitle: 'Software Engineer',
  country: 'India',
  salary: 50000,
};

describe('POST /employees', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('creates an employee, persists it, and returns 201 with the created employee', async () => {
    const app = createApp();
    const payload = { ...validEmployee };

    const response = await request(app).post('/employees').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      fullName: payload.fullName,
      jobTitle: payload.jobTitle,
      country: payload.country,
      salary: payload.salary,
    });

    const persisted = findEmployeeById(response.body.id);
    expect(persisted).toEqual({
      id: response.body.id,
      full_name: payload.fullName,
      job_title: payload.jobTitle,
      country: payload.country,
      salary: payload.salary,
    });
  });

  describe('validation', () => {
    it('returns 400 when fullName is missing', async () => {
      const app = createApp();
      const { fullName: _, ...payload } = validEmployee;

      const response = await request(app).post('/employees').send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'fullName is required' });
    });

    it('returns 400 when jobTitle is missing', async () => {
      const app = createApp();
      const { jobTitle: _, ...payload } = validEmployee;

      const response = await request(app).post('/employees').send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'jobTitle is required' });
    });

    it('returns 400 when country is missing', async () => {
      const app = createApp();
      const { country: _, ...payload } = validEmployee;

      const response = await request(app).post('/employees').send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'country is required' });
    });

    it('returns 400 when salary is negative', async () => {
      const app = createApp();
      const payload = { ...validEmployee, salary: -1 };

      const response = await request(app).post('/employees').send(payload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'salary must be non-negative' });
    });
  });
});

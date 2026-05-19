import request from 'supertest';
import { createApp } from '../src/app';
import { findEmployeeById, resetTestDb } from './helpers/test-db';

describe('POST /employees', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('creates an employee, persists it, and returns 201 with the created employee', async () => {
    const app = createApp();
    const payload = {
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    };

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
});

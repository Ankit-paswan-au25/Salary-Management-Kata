import request from 'supertest';
import { createApp } from '../src/app';
import { insertEmployee, resetTestDb } from './helpers/test-db';

describe('GET /employees/:id', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('returns employee by id', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });

    const response = await request(app).get(`/employees/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id,
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const app = createApp();

    const response = await request(app).get('/employees/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Employee not found' });
  });
});

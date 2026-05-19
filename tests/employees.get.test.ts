import request from 'supertest';
import { createApp } from '../src/app';
import { insertEmployee, resetTestDb } from './helpers/test-db';

describe('GET /employees', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('returns empty array when no employees exist', async () => {
    const app = createApp();

    const response = await request(app).get('/employees');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('returns all employees from SQLite', async () => {
    const app = createApp();
    insertEmployee({
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });
    insertEmployee({
      fullName: 'John Smith',
      jobTitle: 'Product Manager',
      country: 'USA',
      salary: 80000,
    });

    const response = await request(app).get('/employees');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        fullName: 'Jane Doe',
        jobTitle: 'Software Engineer',
        country: 'India',
        salary: 50000,
      },
      {
        id: 2,
        fullName: 'John Smith',
        jobTitle: 'Product Manager',
        country: 'USA',
        salary: 80000,
      },
    ]);
  });
});

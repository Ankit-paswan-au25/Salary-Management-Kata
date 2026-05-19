import request from 'supertest';
import { createApp } from '../src/app';
import { findEmployeeById, insertEmployee, resetTestDb } from './helpers/test-db';

describe('DELETE /employees/:id', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('deletes existing employee', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });

    const response = await request(app).delete(`/employees/${id}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(response.text).toBe('');
    expect(findEmployeeById(id)).toBeUndefined();
  });

  it('returns 404 when employee does not exist', async () => {
    const app = createApp();

    const response = await request(app).delete('/employees/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Employee not found' });
  });
});

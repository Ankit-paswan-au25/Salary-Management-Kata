import request from 'supertest';
import { createApp } from '../src/app';
import { findEmployeeById, insertEmployee, resetTestDb } from './helpers/test-db';

const updatedEmployee = {
  fullName: 'Jane Updated',
  jobTitle: 'Senior Engineer',
  country: 'Canada',
  salary: 75000,
};

describe('PUT /employees/:id', () => {
  beforeEach(() => {
    resetTestDb();
  });

  it('updates existing employee', async () => {
    const app = createApp();
    const id = insertEmployee({
      fullName: 'Jane Doe',
      jobTitle: 'Software Engineer',
      country: 'India',
      salary: 50000,
    });

    const response = await request(app)
      .put(`/employees/${id}`)
      .send(updatedEmployee);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id,
      ...updatedEmployee,
    });

    const persisted = findEmployeeById(id);
    expect(persisted).toEqual({
      id,
      full_name: updatedEmployee.fullName,
      job_title: updatedEmployee.jobTitle,
      country: updatedEmployee.country,
      salary: updatedEmployee.salary,
    });
  });

  it('returns 404 when employee does not exist', async () => {
    const app = createApp();

    const response = await request(app)
      .put('/employees/999')
      .send(updatedEmployee);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Employee not found' });
  });
});

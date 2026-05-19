import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeSalary,
  listEmployees,
  updateEmployee,
} from '../controllers/employees.controller';

const employeesRouter = Router();

employeesRouter.get('/', listEmployees);
employeesRouter.get('/:id/salary', getEmployeeSalary);
employeesRouter.get('/:id', getEmployeeById);
employeesRouter.put('/:id', updateEmployee);
employeesRouter.delete('/:id', deleteEmployee);
employeesRouter.post('/', createEmployee);

export default employeesRouter;

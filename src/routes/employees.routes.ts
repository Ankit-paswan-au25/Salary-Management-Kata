import { Router } from 'express';
import {
  createEmployee,
  getEmployeeById,
  listEmployees,
  updateEmployee,
} from '../controllers/employees.controller';

const employeesRouter = Router();

employeesRouter.get('/', listEmployees);
employeesRouter.get('/:id', getEmployeeById);
employeesRouter.put('/:id', updateEmployee);
employeesRouter.post('/', createEmployee);

export default employeesRouter;

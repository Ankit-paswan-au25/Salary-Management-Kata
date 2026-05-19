import { Router } from 'express';
import {
  createEmployee,
  getEmployeeById,
  listEmployees,
} from '../controllers/employees.controller';

const employeesRouter = Router();

employeesRouter.get('/', listEmployees);
employeesRouter.get('/:id', getEmployeeById);
employeesRouter.post('/', createEmployee);

export default employeesRouter;

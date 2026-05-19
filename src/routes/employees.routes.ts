import { Router } from 'express';
import {
  createEmployee,
  listEmployees,
} from '../controllers/employees.controller';

const employeesRouter = Router();

employeesRouter.get('/', listEmployees);
employeesRouter.post('/', createEmployee);

export default employeesRouter;

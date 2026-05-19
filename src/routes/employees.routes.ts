import { Router } from 'express';
import { createEmployee } from '../controllers/employees.controller';

const employeesRouter = Router();

employeesRouter.post('/', createEmployee);

export default employeesRouter;

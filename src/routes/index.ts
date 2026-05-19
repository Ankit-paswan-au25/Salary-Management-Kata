import { Express } from 'express';
import employeesRouter from './employees.routes';
import healthRouter from './health.routes';

export function registerRoutes(app: Express): void {
  app.use('/health', healthRouter);
  app.use('/employees', employeesRouter);
}
